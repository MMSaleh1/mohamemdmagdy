package com.catchoom.craftar;

//
// CraftAROnDeviceIRUtils.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import com.craftar.CraftARItem;
import com.craftar.CraftAROnDeviceCollection;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

public class CraftAROnDeviceIRUtils {

    public static JSONObject getJSONOnDeviceCollection(CraftAROnDeviceCollection collection){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("publicKey", collection.getPublicKey());
            jsonObject.put("imageFieldTemplate", collection.getImageFieldTemplate());
            jsonObject.put("uuid", collection.getUUID());
            jsonObject.put("name", collection.getName());

            JSONArray jsonArray = new JSONArray();
            for(String token: collection.getTokens()){
                jsonArray.put(token);
            }
            jsonObject.put("tokens", jsonArray);

            JSONArray jsonArrayItems = new JSONArray();
            for (String itemUUDID: collection.listItems()) {
                jsonArrayItems.put(CraftARUtils.getJSONItem(collection.getItem(itemUUDID)));
            }
            jsonObject.put("listItems", jsonArrayItems);
        }
        catch (JSONException e){
            e.printStackTrace();
        }
        return jsonObject;

    }

    public static void addItemsToObjectMap(CraftAROnDeviceCollection collection,
                                           HashMap<String, Object> objectsHashMap){
        for (String itemUUDID: collection.listItems()) {
            CraftARItem item = collection.getItem(itemUUDID);
            if (item.isAR()) {
                objectsHashMap.put(itemUUDID, item);
            }
        }

    }
}
