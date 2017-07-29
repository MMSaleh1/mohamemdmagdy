package com.catchoom.craftar;

import com.craftar.CraftARItemAR;
import com.craftar.CraftARTracking;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;


public class CrafARTrackingPlugin implements CatchoomPluginInterface, CraftARTracking.TrackingEventsHandler{

    CallbackContext trackingCallbackContext;

    CraftARTracking craftARTracking;
    HashMap<String, Object> objectsHashMap;
    HashMap<Integer, CallbackContext> callbackContextHashMap;

    public CrafARTrackingPlugin(HashMap<String, Object> objectsMap){
        objectsHashMap = objectsMap;
        craftARTracking = CraftARTracking.Instance();
        callbackContextHashMap = new HashMap<Integer, CallbackContext>();

    }
    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {
        boolean b = true;

        if ("addItem".equals(action)){
            String uuid = args.getString(0);
            CraftARItemAR item = (CraftARItemAR) objectsHashMap.get(uuid);
            if (item != null)
                craftARTracking.addItem(item);
        }
        else if ("startTracking".equals(action)){
            craftARTracking.startTracking();
        }
        else if ("startTrackingWithTimeout".equals(action)){
            craftARTracking.startTrackingWithTimeout(args.getLong(0));
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
        else {
            b = false;
        }

        return b;
    }

    @Override
    public void trackingStarted(CraftARItemAR craftARItemAR) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("_starTracking",
                craftARItemAR.getJson());
        CraftARUtils.sendResult(trackingCallbackContext, eventResponse);
    }

    @Override
    public void trackingLost(CraftARItemAR craftARItemAR) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("_stopTracking",
                craftARItemAR.getJson());
        CraftARUtils.sendResult(trackingCallbackContext, eventResponse);
    }

    @Override
    public void trackingTimeoutOver() {
        JSONObject eventResponse = CraftARUtils.createEventResponse("_trackingTimeOut",
                new JSONObject());
        CraftARUtils.sendResult(trackingCallbackContext, eventResponse);
    }
}
