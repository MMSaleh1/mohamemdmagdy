package com.catchoom.craftar;

//
// CraftARFinderPlugin.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import com.craftar.CraftARActivity;
import com.craftar.CraftARGenericSDK;
import com.craftar.CraftARSDK;
import com.craftar.SearchController;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;

public class CraftARFinderPlugin implements CatchoomPluginInterface, CraftARGenericSDK.OnFinderTimeoutListener {

    CallbackContext finderWithTimeoutCallbackContext;
    HashMap<String, Object> objectsHashMap;
    CraftARActivity activity;

    public CraftARFinderPlugin(HashMap<String, Object> objects, CraftARActivity act){
        objectsHashMap = objects;
        activity = act;
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           CallbackContext callbackContext) throws JSONException {
        boolean b = true;

        // CraftARCamera
        if ("restartCapture".equals(action)){
            CraftARSDK.Instance().getCamera().restartCapture();
        }

        else if ("pauseCapture".equals(action)){
            CraftARSDK.Instance().getCamera().stopCapture();
        }

        else if ("triggerFocus".equals(action)){
            CraftARSDK.Instance().getCamera().triggerAutoFocus();
        }

        // CraftARSDK
        else if ("singleShotSearch".equals(action)){
            CraftARSDK.Instance().singleShotSearch();
        }

        else if ("setSearchController".equals(action)){
            CraftARPluginManager.getInstance().setSearchController((SearchController) objectsHashMap.get(args.getString(0)));
        }

        else if ("startFinder".equals(action)){
            CraftARSDK.Instance().startFinder();
        }

        else if ("startFinderWithTimeout".equals(action)) {
            long mili = args.optLong(0);
            finderWithTimeoutCallbackContext = callbackContext;
            CraftARSDK.Instance().startFinder(mili, this);
        }

        else if ("stopFinder".equals(action)) {
            CraftARSDK.Instance().stopFinder();
        }

        else if ("isFinding".equals(action)){
            boolean result = CraftARSDK.Instance().isFinding();
            callbackContext.success(Boolean.toString(result));
        }
        else if ("startCapture".equals(action)){
            CraftARPluginManager.getInstance().startCapture(activity);
            CraftARSDK.Instance().getCamera().restartCapture();
            //CraftARSDK.Instance().startCapture(activity);
        }

        else if ("stopCapture".equals(action)){
            CraftARSDK.Instance().getCamera().stopCapture();
        }
        else {
            b = false;
        }

        return b;
    }


    @Override
    public void finderTimeoutOver() {
        finderWithTimeoutCallbackContext.success();
    }
}
