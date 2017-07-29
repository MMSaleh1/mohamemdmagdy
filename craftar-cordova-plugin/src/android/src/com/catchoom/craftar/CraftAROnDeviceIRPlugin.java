package com.catchoom.craftar;


import android.graphics.Bitmap;

import com.craftar.CraftARError;
import com.craftar.CraftAROnDeviceCollection;
import com.craftar.CraftAROnDeviceCollectionManager;
import com.craftar.CraftAROnDeviceIR;
import com.craftar.CraftARQueryImage;
import com.craftar.CraftARResult;
import com.craftar.CraftARSearchResponseHandler;
import com.craftar.ImageRecognition;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;

public class CraftAROnDeviceIRPlugin implements CatchoomPluginInterface, ImageRecognition.SetCollectionListener, ImageRecognition.SetOnDeviceCollectionListener {

    CallbackContext onDeviceSearchCallbackContext;
    CallbackContext collectionCallbackContext;
    CraftAROnDeviceIR onDeviceIR;

    HashMap<String, Object> objectsHashMap;
    HashMap<Integer, CallbackContext> callbackContextHashMap;
    int callbackIdCounter = 0;

    public final static String ONDEVICE_RECOGNITION_ID = "ODSEARCHCONTROLLER";

    public CraftAROnDeviceIRPlugin(HashMap<String, Object> objects){
        objectsHashMap = objects;
        onDeviceIR = CraftAROnDeviceIR.Instance();
        onDeviceIR.setCraftARSearchResponseHandler(new OnDeviceResponseHandler());
        objectsHashMap.put(ONDEVICE_RECOGNITION_ID, onDeviceIR.getSearchController());
        callbackContextHashMap = new HashMap<Integer, CallbackContext>();
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {

        // OnDevice Collection Manager
        if ("onDeviceSearchProtocol".equals(action)){
            onDeviceSearchCallbackContext = callbackContext;
        }

        else if ("onDeviceIRSetCollectionWithToken".equals(action)){
            String token = args.getString(0);
            collectionCallbackContext = callbackContext;

            if (args.length() == 2){
                Boolean active = args.getBoolean(1);
                onDeviceIR.setCollection(token, active, this);

            } else {
                onDeviceIR.setCollection(token, this);
            }
        }

        else if ("onDeviceIRSetCollection".equals(action)){
            collectionCallbackContext = callbackContext;

            String instanceId = args.getString(0);
            CraftAROnDeviceCollection collection = (CraftAROnDeviceCollection) objectsHashMap.get(instanceId);

            if (args.length() == 2){
                Boolean active = args.getBoolean(1);
                onDeviceIR.setCollection(collection, active, this);

            } else{
                onDeviceIR.setCollection(collection, this);
            }
        }


        else if ("onDeviceIRUnloadCollection".equals(action)){
            String uuid = args.getString(0);
            onDeviceIR.unloadCollection(uuid);
        }


        else if ("onDeviceIRSearchWithImage".equals(action)){
            JSONObject queryImage = args.getJSONObject(0);
            String imageString = queryImage.getString("image");
            Bitmap image = CraftARUtils.decodeBase64(imageString);
            callbackContextHashMap.put(callbackIdCounter, callbackContext);
            onDeviceIR.search(new CraftARQueryImage(image), callbackIdCounter++);

        }

        else {
            return false;
        }

        return true;
    }

    @Override
    public void collectionReady() {
        JSONObject eventResponse = CraftARUtils.createEventResponse("success", new JSONObject());
        CraftARUtils.sendResult(collectionCallbackContext, eventResponse, true, PluginResult.Status.OK);
    }

    @Override
    public void setCollectionFailed(CraftARError craftARError) {
        PluginResult result = new PluginResult(PluginResult.Status.ERROR, CraftARUtils.getJSONCraftARError(craftARError));
        collectionCallbackContext.sendPluginResult(result);
    }

    @Override
    public void setCollectionProgress(double v) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("progress", v * 100.0);
        CraftARUtils.sendResult(collectionCallbackContext, eventResponse, true, PluginResult.Status.OK);
    }

    class OnDeviceResponseHandler implements CraftARSearchResponseHandler {

        @Override
        public void searchResults(ArrayList<CraftARResult> results,	long searchTimeMillis, int requestCode) {

            if (onDeviceSearchCallbackContext != null){
                JSONArray jsonArray = null;
                try {
                    jsonArray = CraftARUtils.getJSONCraftARResults(results);
                } catch (JSONException e) {
                    e.printStackTrace();
                }

                CraftARUtils.sendResult(onDeviceSearchCallbackContext,
                        jsonArray, true, PluginResult.Status.OK);
            }

        }

        @Override
        public void searchFailed(CraftARError error, int requestCode) {
            if (onDeviceSearchCallbackContext != null){

                CraftARUtils.sendResult(onDeviceSearchCallbackContext,
                        CraftARUtils.getJSONCraftARError(error), true, PluginResult.Status.ERROR);
            }
        }

    }

}
