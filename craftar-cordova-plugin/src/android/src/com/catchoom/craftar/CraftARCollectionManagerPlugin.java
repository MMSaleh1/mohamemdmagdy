package com.catchoom.craftar;

//
// CraftARCollectionManagerPlugin.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import com.craftar.CraftAROnDeviceCollection;
import com.craftar.CraftAROnDeviceCollectionManager;

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashMap;

public class CraftARCollectionManagerPlugin implements CatchoomPluginInterface{

    CraftAROnDeviceCollectionManager collectionManager;
    CallbackContext collectionManagerCallbackContext;
    HashMap<String, Object> objectsHashMap;

    public static final String ASSETS_PATH = "www/";


    public CraftARCollectionManagerPlugin(HashMap<String, Object> objects){
        objectsHashMap = objects;
        collectionManager = CraftAROnDeviceCollectionManager.Instance();
    }


    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if ("onDeviceCMProtocol".equals(action)){
            collectionManagerCallbackContext = callbackContext;
        }

        else if ("onDeviceCMAddCollectionWithBundleFile".equals(action)){
            String bundleFile = args.getString(0);
            collectionManagerCallbackContext = callbackContext;
            collectionManager.addCollection(ASSETS_PATH+ bundleFile,
                            new CraftARCollectionListener(collectionManagerCallbackContext, objectsHashMap));
        }

        else if ("onDeviceCMAddCollectionWithToken".equals(action)){
            String token = args.getString(0);
            collectionManagerCallbackContext = callbackContext;
            collectionManager.addCollectionWithToken(token,
                    new CraftARCollectionListener(collectionManagerCallbackContext, objectsHashMap));
        }

        /*
        else if ("onDeviceCMClearCraftARMediaDirectory".equals(action)){
           collectionManager.clearCraftARMediaDirectory();
            callbackContext.success();
        }*/

        else if ("onDeviceCMDeleteCollection".equals(action)){
            collectionManagerCallbackContext = callbackContext;

            String instanceId = args.getString(0);
            CraftAROnDeviceCollection collection = (CraftAROnDeviceCollection) objectsHashMap.get(instanceId);
            String hashId = null;

            if (collection != null) {
                hashId = collection.getUUID();
            }

            collectionManager.deleteCollection(collection, new CraftARCollectionListener(collectionManagerCallbackContext, objectsHashMap, hashId));
        }

        else if ("onDeviceCMDeleteCollectionWithToken".equals(action)){
            collectionManagerCallbackContext = callbackContext;

            String token = args.getString(0);
            CraftAROnDeviceCollection collection = collectionManager.get(token);
            String hashId = collection.getUUID();

            collectionManager.deleteCollection(token, new CraftARCollectionListener(collectionManagerCallbackContext, objectsHashMap, hashId));
        }

        else if ("onDeviceCMGet".equals(action)){
            String token = args.getString(0);
            callbackContext.success(CraftAROnDeviceIRUtils.getJSONOnDeviceCollection(collectionManager.get(token)));
        }

        /*else if ("onDeviceCMGetCollections".equals(action)){
            ArrayList<CraftAROnDeviceCollection> arrayList = collectionManager.getCollections();
            JSONArray jsonArray = new JSONArray();

            for(CraftAROnDeviceCollection collection: arrayList){
                jsonArray.put(CraftAROnDeviceIRUtils.getJSONOnDeviceCollection(collection));
            }

            callbackContext.success(jsonArray);
        }*/

        else if ("onDeviceCMSetSyncURL".equals(action)){
            String url = args.getString(0);
            collectionManager.setSyncURL(url);
            callbackContext.success();
        }

        else if ("onDeviceCMSyncCollection".equals(action)){
            collectionManagerCallbackContext = callbackContext;

            String instanceId = args.getString(0);
            CraftAROnDeviceCollection collection = (CraftAROnDeviceCollection) objectsHashMap.get(instanceId);
            collectionManager.syncCollection(collection, new CraftARCollectionListener(collectionManagerCallbackContext, objectsHashMap));
        }

        else if ("onDeviceCMSyncCollectionWithToken".equals(action)){
            collectionManagerCallbackContext = callbackContext;

            String instanceId = args.getString(0);
            String token = args.getString(1);

            CraftAROnDeviceCollection collection = (CraftAROnDeviceCollection) objectsHashMap.get(instanceId);
            collectionManager.syncCollection(collection, token, new CraftARCollectionListener(collectionManagerCallbackContext, objectsHashMap));
        }

        else {
            return false;
        }

        return true;
    }
}
