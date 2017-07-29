package com.catchoom.craftar;

//
// CustomSearchController.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import com.craftar.CraftARError;
import com.craftar.CraftARQueryImage;
import com.craftar.SearchController;

import org.apache.cordova.CallbackContext;
import org.json.JSONObject;

public class CustomSearchController implements SearchController{

    CallbackContext callbackContext;

    public CustomSearchController(CallbackContext callbackContext){
        this.callbackContext = callbackContext;
    }

    @Override
    public void onPictureTaken(CraftARQueryImage craftARQueryImage) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("pictureTaken", CraftARUtils.getJSONQueryImage(craftARQueryImage));
        CraftARUtils.sendResult(callbackContext, eventResponse);
    }

    @Override
    public void onTakePictureFailed(CraftARError craftARError) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("takePictureFailed", CraftARUtils.getJSONCraftARError(craftARError));
        CraftARUtils.sendResult(callbackContext, eventResponse);
    }

    @Override
    public void onPreviewFrame(CraftARQueryImage craftARQueryImage) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("previewFrame", CraftARUtils.getJSONQueryImage(craftARQueryImage));
        CraftARUtils.sendResult(callbackContext, eventResponse);
    }

    @Override
    public void onFinderActivated() {
        JSONObject eventResponse = CraftARUtils.createEventResponse("finderActivated", true);
        CraftARUtils.sendResult(callbackContext, eventResponse);
    }

    @Override
    public void onFinderDeactivated() {
        JSONObject eventResponse = CraftARUtils.createEventResponse("finderActivated", false);
        CraftARUtils.sendResult(callbackContext, eventResponse);
    }
}
