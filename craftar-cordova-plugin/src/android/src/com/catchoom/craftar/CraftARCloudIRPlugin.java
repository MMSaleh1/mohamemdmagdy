package com.catchoom.craftar;

//
// CraftARCloudIRPlugin.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import android.graphics.Bitmap;

import com.craftar.CraftARCloudRecognition;
import com.craftar.CloudSearchController;
import com.craftar.CraftARError;
import com.craftar.CraftARQueryImage;
import com.craftar.CraftARResult;
import com.craftar.CraftARSDK;
import com.craftar.CraftARSearchResponseHandler;
import com.craftar.SetCloudCollectionListener;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Observable;

public class CraftARCloudIRPlugin extends Observable implements CatchoomPluginInterface, SetCloudCollectionListener{
    public final static String CLOUD_RECOGNITION_ID = "CRSEARCHCONTROLLER";

    CallbackContext collectionCallbackContext;
    CallbackContext searchCallbackContext;

    CraftARCloudRecognition cloudRecognition;
    HashMap<String, Object> objectsHashMap;
    HashMap<Integer, CallbackContext> callbackContextHashMap;
    int callbackIdCounter = 0;

    public CraftARCloudIRPlugin(HashMap<String, Object> objectsMap){
        objectsHashMap = objectsMap;
        cloudRecognition = CraftARCloudRecognition.Instance();
        objectsHashMap.put(CLOUD_RECOGNITION_ID, cloudRecognition.getSearchController());
        cloudRecognition.setCraftARSearchResponseHandler(new CloudResponseHandler());
        callbackContextHashMap = new HashMap<Integer, CallbackContext>();

    }
    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {

        boolean b = true;

        if ("searchProtocol".equals(action)){
            searchCallbackContext = callbackContext;
            cloudRecognition.setCraftARSearchResponseHandler(new CloudResponseHandler());
        }
        // Cloud Recognition
        else if ("setCollectionWithToken".equals(action)){
            String token = args.getString(0);
            collectionCallbackContext = callbackContext;
            cloudRecognition.setCollection(token, this);
        }

        else if ("searchWithImage".equals(action)){
            JSONObject queryImage = args.getJSONObject(0);
            String imageString = queryImage.getString("image");
            Bitmap image = CraftARUtils.decodeBase64(imageString);
            callbackContextHashMap.put(callbackIdCounter, callbackContext);
            cloudRecognition.search(new CraftARQueryImage(image), callbackIdCounter++);

        }

        else if ("setEmbedCustom".equals(action)){
            cloudRecognition.setEmbedCustom(args.getBoolean(0));
        }

        else if ("setRequestBoundingBoxes".equals(action)) {
            cloudRecognition.setRequestBoundingBoxes(args.getBoolean(0));
        }

        else if ("setSearchURL".equals(action)){
            cloudRecognition.setSearchURL(args.getString(0));
        }

        else if ("setConnectURL".equals(action)){
            cloudRecognition.setConnectURL(args.getString(0));
        }

        else if (("setRequestBoundingBoxes").equals(action)){
            cloudRecognition.setRequestBoundingBoxes(args.getBoolean(0));
        }

        else if ("getPendingSearchRequestsCount".equals(action)){
            int count = cloudRecognition.getPendingSearchRequestsCount();
            callbackContext.success(count);
        }
        else if ("setSearchPeriod".equals(action)){
            ((CloudSearchController)cloudRecognition.getSearchController()).setSearchPeriod(args.getInt(0));
        }
        else {
            b = false;
        }

        return b;

    }

    @Override
    public void collectionReady() {
        collectionCallbackContext.success();
    }

    @Override
    public void setCollectionFailed(CraftARError craftARError) {
        PluginResult result = new PluginResult(PluginResult.Status.ERROR, CraftARUtils.getJSONCraftARError(craftARError));
        collectionCallbackContext.sendPluginResult(result);
    }

    class CloudResponseHandler implements CraftARSearchResponseHandler {

        @Override
        public void searchResults(ArrayList<CraftARResult> arrayList, long l, int i) {

            CallbackContext context = callbackContextHashMap.get(i);
            CallbackContext ret = searchCallbackContext;
            boolean b = true;

            if (arrayList.size() > 0 &&  CraftARSDK.Instance().isFinding()){
                CraftARSDK.Instance().stopFinder();
            }
            notifyObservers(arrayList);
            setChanged();

            if (context != null)  {
                ret = context;
                callbackContextHashMap.remove(i);
                b = false;
            }

            if (ret != null){

                PluginResult result = null;
                JSONArray jsonArray;
                try {
                    jsonArray = CraftARUtils.getJSONCraftARResults(arrayList);
                    result = new PluginResult(PluginResult.Status.OK,jsonArray );
                } catch (JSONException e) {
                    e.printStackTrace();
                }
                result.setKeepCallback(b);
                ret.sendPluginResult(result);

            }

        }

        @Override
        public void searchFailed(CraftARError craftARError, int i) {

            CallbackContext context = callbackContextHashMap.get(i);
            CallbackContext ret = searchCallbackContext;
            boolean b = true;

            if (context != null)  {
                ret = context;
                callbackContextHashMap.remove(i);
                b = false;
            }

            if (searchCallbackContext != null){
                PluginResult result = new PluginResult(PluginResult.Status.ERROR, CraftARUtils.getJSONCraftARError(craftARError));
                result.setKeepCallback(b);
                ret.sendPluginResult(result);
            }

        }

    }
}
