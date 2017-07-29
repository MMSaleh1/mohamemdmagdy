package com.catchoom.craftar;

//
// CraftARUtils.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import android.content.Context;
import android.content.res.AssetManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Base64;
import android.util.Log;

import com.craftar.CraftARBoundingBox;
import com.craftar.CraftARCollection;
import com.craftar.CraftARError;
import com.craftar.CraftARImage;
import com.craftar.CraftARItem;
import com.craftar.CraftARQueryImage;
import com.craftar.CraftARResult;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;

public class CraftARUtils {

    public static JSONArray getJSONCraftARResults(ArrayList<CraftARResult> results) throws JSONException{
        JSONArray jsonArray = new JSONArray();

        for(CraftARResult result: results){
            jsonArray.put(getJSONResult(result));
        }

        return jsonArray;
    }

    public static JSONObject getJSONResult(CraftARResult result) throws JSONException {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("score", result.getScore());
        jsonObject.put("item", getJSONItem(result.getItem()));
        //jsonObject.put("item", result.getItem().getJson());
        jsonObject.put("matchedImage", getJSONMatchedImage(result.getMatchedImage()));
        jsonObject.put("boundingBox", getJSONBoundingBox(result.getBoundingBox()));

        return jsonObject;
    }

    public static JSONObject getJSONItem(CraftARItem item){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("name", item.getItemName());
            jsonObject.put("url", item.getUrl());
            jsonObject.put("custom", item.getCustom());
            jsonObject.put("uuid", item.getItemId());
            jsonObject.put("isAR", item.isAR());
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONObject getJSONMatchedImage(CraftARImage image) throws JSONException{
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("thumbnail320Url", image.getThumbnail320URL());
        jsonObject.put("thumbnail120Url", image.getThumbnail120URL());
        jsonObject.put("thumbnail60Url", image.getThumbnail60URL());
        jsonObject.put("uuid", image.getUUID());

        return jsonObject;

    }

    public static JSONObject getJSONBoundingBox(CraftARBoundingBox boundingBox) throws JSONException {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("BLx", boundingBox.BLx);
        jsonObject.put("BLy", boundingBox.BLy);
        jsonObject.put("BRx", boundingBox.BRx);
        jsonObject.put("BRy", boundingBox.BRy);
        jsonObject.put("TLx", boundingBox.TLx);
        jsonObject.put("TLy", boundingBox.TLy);
        jsonObject.put("TRx", boundingBox.TRx);
        jsonObject.put("TRy", boundingBox.TRy);

        return jsonObject;
    }

    public static JSONObject getJSONCollection(CraftARCollection collection) throws JSONException {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("imageFieldTemplate", collection.getImageFieldTemplate());
        jsonObject.put("uuid", collection.getUUID());
        jsonObject.put("publicKey", collection.getPublicKey());

        return jsonObject;
    }

    public static JSONObject getJSONCraftARError(CraftARError error){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("errorCode", error.getErrorCode());
            jsonObject.put("errorMessage", error.getErrorMessage());
        } catch (JSONException e){
            e.printStackTrace();
        }
        return jsonObject;

    }

    public static JSONObject getJSONQueryImage(CraftARQueryImage queryImage){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("image", encodeTobase64(queryImage.toBitmap()));
        }
        catch (JSONException e){
            e.printStackTrace();
        }
        return jsonObject;

    }

    public static String encodeTobase64(Bitmap image) {
        Bitmap immagex = image;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        immagex.compress(Bitmap.CompressFormat.PNG, 100, baos);
        byte[] b = baos.toByteArray();
        String imageEncoded = "data:image/png;base64," + Base64.encodeToString(b, Base64.DEFAULT);

        return imageEncoded;
    }

    public static Bitmap decodeBase64(String input) {
        byte[] decodedByte = Base64.decode(input, 0);
        return BitmapFactory.decodeByteArray(decodedByte, 0, decodedByte.length);
    }

    public static JSONObject createEventResponse(String eventName, JSONObject resultObject){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("event", eventName);
            jsonObject.put("result", resultObject);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONObject createEventResponse(String eventName, boolean b){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("event", eventName);
            jsonObject.put("result", b);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONObject createEventResponse(String eventName, float f){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("event", eventName);
            jsonObject.put("result", f);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONObject createEventResponse(String eventName, String s){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("event", eventName);
            jsonObject.put("result", s);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static JSONObject createEventResponse(String eventName, double d){
        JSONObject jsonObject = new JSONObject();

        try {
            jsonObject.put("event", eventName);
            jsonObject.put("result", d);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return jsonObject;
    }

    public static void sendResult(CallbackContext callbackContext, JSONObject jsonObject){
        sendResult(callbackContext, jsonObject, false, PluginResult.Status.OK );
    }

    public static void sendResultError(CallbackContext callbackContext, JSONObject jsonObject){
        sendResult(callbackContext, jsonObject, false, PluginResult.Status.ERROR);
    }

    public static void sendResult(CallbackContext callbackContext, JSONObject jsonObject,
                                  boolean keepCallback, PluginResult.Status status){
        PluginResult result = new PluginResult(status, jsonObject);
        result.setKeepCallback(keepCallback);
        callbackContext.sendPluginResult(result);
    }

    public static void sendResult(CallbackContext callbackContext, JSONArray jsonObject,
                                  boolean keepCallback, PluginResult.Status status){
        PluginResult result = new PluginResult(status, jsonObject);
        result.setKeepCallback(keepCallback);
        callbackContext.sendPluginResult(result);
    }

    public static void copyAssetToInternalDir(Context context, String asset){
        AssetManager assetManager = context.getAssets();
        InputStream in = null;
        OutputStream out = null;

        try {
            in = assetManager.open("www/" + asset);
            File outFile = new File(context.getFilesDir(), asset);
            out = new FileOutputStream(outFile);
            copyFile(in, out);
            } catch(IOException e) {
            }

        finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                }
            }
            if (out != null) {
                try {
                    out.close();
                } catch (IOException e) {

                }
            }
        }
    }

    public static void copyFile(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[1024];
        int read;
        while((read = in.read(buffer)) != -1){
            out.write(buffer, 0, read);
        }
    }
}
