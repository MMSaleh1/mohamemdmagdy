package com.catchoom.craftar;

//
// CraftARCollectionListener.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import com.craftar.CraftARError;
import com.craftar.CraftAROnDeviceCollection;
import com.craftar.CraftAROnDeviceCollectionManager;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public class CraftARCollectionListener implements  CraftAROnDeviceCollectionManager.SyncCollectionListener,
        CraftAROnDeviceCollectionManager.DeleteCollectionListener,
        CraftAROnDeviceCollectionManager.AddCollectionListener {

    CallbackContext callbackContext;
    HashMap<String, Object> objectsHashMap;
    String hashId;

    public CraftARCollectionListener(CallbackContext collectionManagerCallbackContext){
        callbackContext = collectionManagerCallbackContext;
    }

    public CraftARCollectionListener(CallbackContext collectionManagerCallbackContext,
                                     HashMap<String, Object> hashMap,
                                     String hashId){
        callbackContext = collectionManagerCallbackContext;
        objectsHashMap = hashMap;
        this.hashId = hashId;
    }

    public CraftARCollectionListener(CallbackContext collectionManagerCallbackContext,
                                     HashMap<String, Object> hashMap){
        callbackContext = collectionManagerCallbackContext;
        objectsHashMap = hashMap;
    }


    // Implements CraftAROnDeviceCollectionManager.SyncCollectionListener
    @Override
    public void syncSuccessful(CraftAROnDeviceCollection craftAROnDeviceCollection) {
        JSONObject jsonObject = CraftAROnDeviceIRUtils.getJSONOnDeviceCollection(craftAROnDeviceCollection);

        try {
            objectsHashMap.put(jsonObject.getString("uuid"), craftAROnDeviceCollection);
            CraftAROnDeviceIRUtils.addItemsToObjectMap(craftAROnDeviceCollection, objectsHashMap);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        JSONObject eventResponse = CraftARUtils.createEventResponse("success", jsonObject);
        CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);

    }

    public void syncFinishedWithErrors(CraftAROnDeviceCollection craftAROnDeviceCollection, int i, int i1) {
        CraftARUtils.sendResult(callbackContext,  new JSONObject(), true, PluginResult.Status.ERROR);

    }

    @Override
    public void syncProgress(CraftAROnDeviceCollection craftAROnDeviceCollection, float v) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("progress", v * 100);
        CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);
    }

    @Override
    public void syncFailed(CraftAROnDeviceCollection craftAROnDeviceCollection, CraftARError craftARError) {
        CraftARUtils.sendResult(callbackContext,  CraftARUtils.getJSONCraftARError(craftARError), true, PluginResult.Status.ERROR);
    }


    // Implements  CraftAROnDeviceCollectionManager.DeleteCollectionListener
    @Override
    public void deleteCollectionFailed(CraftARError craftARError) {
        CraftARUtils.sendResult(callbackContext,  CraftARUtils.getJSONCraftARError(craftARError), true, PluginResult.Status.ERROR);
    }

    @Override
    public void collectionDeleted() {
        if (hashId != null) {
            objectsHashMap.remove(hashId);
        }
        CraftARUtils.sendResult(callbackContext, new JSONObject(), true, PluginResult.Status.OK);
    }

    @Override
    public void collectionAdded(CraftAROnDeviceCollection craftAROnDeviceCollection) {

        JSONObject jsonObject = CraftAROnDeviceIRUtils.getJSONOnDeviceCollection(craftAROnDeviceCollection);

        try {
            objectsHashMap.put(jsonObject.getString("uuid"), craftAROnDeviceCollection);
            CraftAROnDeviceIRUtils.addItemsToObjectMap(craftAROnDeviceCollection, objectsHashMap);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        JSONObject eventResponse = CraftARUtils.createEventResponse("success", jsonObject);
        CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);

    }

    @Override
    public void addCollectionFailed(CraftARError craftARError) {
        CraftARUtils.sendResult(callbackContext, CraftARUtils.getJSONCraftARError(craftARError),
                true, PluginResult.Status.ERROR);

    }

    @Override
    public void addCollectionProgress(float v) {
        JSONObject eventResponse = CraftARUtils.createEventResponse("progress", v * 100);
        CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);
    }
}
