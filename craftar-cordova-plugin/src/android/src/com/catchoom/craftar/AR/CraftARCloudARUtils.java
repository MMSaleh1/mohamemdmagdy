package com.catchoom.craftar;

//
// CraftARCloudARUtils.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import com.craftar.CraftARContent;

import org.json.JSONException;
import org.json.JSONObject;

public class CraftARCloudARUtils {

    public static JSONObject getJSONCraftARTouchEvent(CraftARTrackingPlugin.CONTENT_TOUCHED event, CraftARContent content){
        JSONObject jsonObject = new JSONObject();

        try{
            jsonObject.put("event", event.ordinal());
            jsonObject.put("content", getJSONCraftARContent(content));
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONObject getJSONCraftARContent(CraftARContent content){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("uuid", content.getUUID());
            jsonObject.put("hyperlinkUrl", content.mHyperlinkUrl);

        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }
}
