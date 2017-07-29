package com.catchoom.craftar;

//
// CraftARTrackingPlugin.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//


import com.craftar.CraftARContent;
import com.craftar.CraftARContentImage;
import com.craftar.CraftARError;
import com.craftar.CraftARItem;
import com.craftar.CraftARItemAR;
import com.craftar.CraftARResult;
import com.craftar.CraftARSDK;
import com.craftar.CraftARTouchEventInterface;
import com.craftar.CraftARTracking;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Observable;
import java.util.Observer;


public class CraftARTrackingPlugin implements CatchoomPluginInterface, CraftARTracking.TrackingEventsHandler,
        Observer, CraftARTouchEventInterface.OnTouchEventListener{

    public enum CONTENT_TOUCHED {
        CRAFTAR_CONTENT_TOUCH_IN,
        CRAFTAR_CONTENT_TOUCH_OUT,
        CRAFTAR_CONTENT_TOUCH_DOWN,
        CRAFTAR_CONTENT_TOUCH_UP
    };


    CallbackContext trackingCallbackContext;
    CallbackContext touchCallbackContext;

    CraftARTracking craftARTracking;
    HashMap<String, Object> objectsHashMap;
    HashMap<Integer, CallbackContext> callbackContextHashMap;

    public CraftARTrackingPlugin(HashMap<String, Object> objectsMap){
        objectsHashMap = objectsMap;
        craftARTracking = CraftARTracking.Instance();
        callbackContextHashMap = new HashMap<Integer, CallbackContext>();
        CraftARSDK.Instance().setOnContentTouchListener(this);
        craftARTracking.setTrackingEventsHandler(this);

    }

    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {
        boolean b = true;

        if ("addItem".equals(action)){
            String uuid = args.getString(0);
            CraftARItemAR item = (CraftARItemAR) objectsHashMap.get(uuid);
            if (item != null) {
                CraftARError err = craftARTracking.addItem(item);
                if (err == null || err.getErrorCode() == CraftARError.ERROR_CODES.CRAFTAR_ITEM_AR_ALREADY_ADDED) {
                    callbackContext.success();
                } else {
                    callbackContext.error(CraftARUtils.getJSONCraftARError(err));
                }
            }
        }
        else if ("startTracking".equals(action)){
            craftARTracking.startTracking();
        }
        else if ("startTrackingWithTimeout".equals(action)){
            craftARTracking.startTrackingWithTimeout(args.getLong(0) * 1000);
        }
        else if ("stopTracking".equals(action)){
            craftARTracking.stopTracking();
        }
        else if ("removeItem".equals(action)){
            String uuid = args.getString(0);
            CraftARItemAR item = (CraftARItemAR) objectsHashMap.get(uuid);
            if (item != null)
                craftARTracking.removeItem(item);
        }
        else if ("removeAllItems".equals(action)){
            craftARTracking.removeAllItems();
        }
        else if("craftARTrackingProtocol".equals(action)){
            trackingCallbackContext = callbackContext;
        }
        else if("touchProtocol".equals(action)){
            touchCallbackContext = callbackContext;
        }
        else {
            b = false;
        }

        return b;
    }

    void addContent(CraftARItemAR myARItem){

        //String imageUrl = CraftARPlugin.ANDROID_FILE + "logo.png";
        String imageUrl = "http://marcosjurado.com/images/hola.png";
        CraftARContentImage myImage = new CraftARContentImage(imageUrl);

        // This will make the content to be scaled to match the edges of the reference image. This doesn't keep the aspect ratio of the content.
        myImage.setWrapMode(CraftARContent.ContentWrapMode.WRAP_MODE_SCALE_FILL);

        // Add the content to the AR item
        myARItem.addContent(myImage);

        // Add the item to the tracking and start tracking.
        craftARTracking.addItem(myARItem);
        craftARTracking.startTracking();
    }

    @Override
    public void trackingStarted(CraftARItemAR craftARItemAR) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("didStartTracking",
                craftARItemAR.getJson());

        CraftARUtils.sendResult(trackingCallbackContext, eventResponse, true, PluginResult.Status.OK);
    }

    @Override
    public void trackingLost(CraftARItemAR craftARItemAR) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("didStopTracking",
                craftARItemAR.getJson());
        CraftARUtils.sendResult(trackingCallbackContext, eventResponse, true, PluginResult.Status.OK);
    }

    @Override
    public void trackingTimeoutOver() {
        JSONObject eventResponse = CraftARUtils.createEventResponse("trackingTimeoutOver",
                new JSONObject());
        CraftARUtils.sendResult(trackingCallbackContext, eventResponse, true, PluginResult.Status.OK);
    }

    // Observing search results
    @Override
    public void update(Observable observable, Object data) {

        if(observable instanceof CraftARCloudIRPlugin){
            saveARItems((ArrayList<CraftARResult>) data);
        }
    }

    void saveARItems(ArrayList<CraftARResult> results){
        for(CraftARResult result : results){
            CraftARItem item = result.getItem();

            if (item.isAR()) {
                //addContent((CraftARItemAR)item);
                objectsHashMap.put(item.getItemId(), item);
            }
        }
    }

    @Override
    public void onTouchIn(CraftARContent craftARContent) {
        JSONObject result = CraftARCloudARUtils.getJSONCraftARTouchEvent(CONTENT_TOUCHED.CRAFTAR_CONTENT_TOUCH_IN, craftARContent);
        CraftARUtils.sendResult(touchCallbackContext, result, true, PluginResult.Status.OK);
    }

    @Override
    public void onTouchOut(CraftARContent craftARContent) {
        JSONObject result = CraftARCloudARUtils.getJSONCraftARTouchEvent(CONTENT_TOUCHED.CRAFTAR_CONTENT_TOUCH_OUT, craftARContent);
        CraftARUtils.sendResult(touchCallbackContext, result, true, PluginResult.Status.OK);
    }

    @Override
    public void onTouchDown(CraftARContent craftARContent) {
        JSONObject result = CraftARCloudARUtils.getJSONCraftARTouchEvent(CONTENT_TOUCHED.CRAFTAR_CONTENT_TOUCH_DOWN, craftARContent);
        CraftARUtils.sendResult(touchCallbackContext, result, true, PluginResult.Status.OK);
    }

    @Override
    public void onTouchUp(CraftARContent craftARContent) {
        JSONObject result = CraftARCloudARUtils.getJSONCraftARTouchEvent(CONTENT_TOUCHED.CRAFTAR_CONTENT_TOUCH_UP, craftARContent);
        CraftARUtils.sendResult(touchCallbackContext, result, true, PluginResult.Status.OK);
    }
}
