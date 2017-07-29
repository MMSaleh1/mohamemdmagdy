package com.catchoom.craftar;


import com.craftar.CraftAROnDeviceCollection;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class CraftAROnDeviceIRUtils {

    public static JSONObject getJSONOnDeviceCollection(CraftAROnDeviceCollection collection){
        JSONObject jsonObject = new JSONObject();
        //String hashId = String.valueOf(System.identityHashCode(collection));


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
                collection.getItem(itemUUDID).getJson();
            }
            jsonObject.put("items", jsonArrayItems);
            //jsonObject.put("instanceId", hashId);
        }
        catch (JSONException e){
            e.printStackTrace();
        }
        return jsonObject;

    }
}
