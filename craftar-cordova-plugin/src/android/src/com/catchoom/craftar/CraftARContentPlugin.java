package com.catchoom.craftar;

//
// CraftARContentPlugin.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import android.content.Context;
import com.craftar.CraftARContent;
import com.craftar.CraftARContent3dmodel;
import com.craftar.CraftARContentImage;
import com.craftar.CraftARContentImageButton;
import com.craftar.CraftARContentVideo;
import com.craftar.CraftARItemAR;
import com.craftar.CraftARSDK;
import com.craftar.CraftARSDKException;
import com.craftar.CraftARTouchEventInterface;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Iterator;

public class CraftARContentPlugin implements CatchoomPluginInterface, CraftARTouchEventInterface.OnTouchEventListener {

    HashMap<String, Object> objectsHashMap;

    Context context;

    CordovaInterface cordova;

    public CraftARContentPlugin(HashMap<String, Object> objectsMap, Context ctx, CordovaInterface cdv) {
        objectsHashMap = objectsMap;
        context = ctx;
        cordova  = cdv;
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        boolean b = true;


        if ("contentImageInitWithImage".equals(action)){
            String path = args.getString(0);
            Boolean isImagePath = args.getBoolean(1);

            String imageUrl = null;

            if (isImagePath) {
                CraftARUtils.copyAssetToInternalDir(context, path);
                imageUrl = context.getFilesDir().toString() + "/" + path;
            }
            else {
                imageUrl = path;
            }


            CraftARContentImage img = new CraftARContentImage(imageUrl);

            String instanceId = "" + System.identityHashCode(img);

            objectsHashMap.put(instanceId, img);

            JSONObject eventResponse = CraftARUtils.createEventResponse("created", instanceId);
            CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);
        }

        else if ("contentVideoInitWithVideo".equals(action)){
            String path = args.getString(0);
            Boolean isVideoPath = args.getBoolean(1);

            String videoUrl;

            if (isVideoPath) {
                //videoUrl = "http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_50mb.mp4";
                //String imageUrl = CraftARPlugin.ANDROID_FILE + path;
                CraftARUtils.copyAssetToInternalDir(context, path);
                videoUrl = context.getFilesDir().toString() + "/" + path;
            }
            else {
                videoUrl = path;
            }

            CraftARContentVideo video = new CraftARContentVideo(videoUrl);

            String instanceId = "" + System.identityHashCode(video);

            objectsHashMap.put(instanceId, video);

            video.setAutoPlay(true);

            JSONObject eventResponse = CraftARUtils.createEventResponse("created", instanceId);
            CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);

        }

        else if ("contentVideoPlay".equals(action)){
            String instanceId = args.getString(0);
            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.play();
        }

        else if ("contentVideoPause".equals(action)){
            String instanceId = args.getString(0);
            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.pause();
        }

        else if ("contentVideoStop".equals(action)){
            String instanceId = args.getString(0);
            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.stop();

        }

        else if ("contentVideoSetAutoPlay".equals(action)){
            String instanceId = args.getString(0);
            boolean autoPlay = args.getBoolean(1);

            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.setAutoPlay(autoPlay);
        }

        else if ("contentVideoSetLooping".equals(action)){
            String instanceId = args.getString(0);
            boolean looping = args.getBoolean(1);

            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.setLooping(looping);
        }

        else if ("contentVideoSetMuted".equals(action)){
            String instanceId = args.getString(0);
            boolean muted = args.getBoolean(1);

            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.setMuted(muted);
        }

        else if ("contentVideoSeekToWithPercent".equals(action)){
            String instanceId = args.getString(0);
            float percent = (float) args.getDouble(1);

            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.seekTo(percent);
        }

        else if ("contentVideoSeekToWithMiliSeconds".equals(action)){
            String instanceId = args.getString(0);
            float ms = (float) args.getInt(1);

            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            video.seekTo(ms);
        }

        else if ("contentVideoGetPositionMS".equals(action)){
            String instanceId = args.getString(0);

            CraftARContentVideo video = (CraftARContentVideo) objectsHashMap.get(instanceId);
            int ms = video.getPositionMS();
            callbackContext.success(ms);
        }

        else if ("contentButtonInitWithImages".equals(action)){
            String image1 = args.getString(0);
            String image2 = args.getString(1);
            String actionUrl = args.getString(2);
            Boolean isImagePath = args.getBoolean(3);

            JSONObject jsonObject = new JSONObject();
            if (isImagePath == true){
                //image1 = CraftARPlugin.ANDROID_FILE + image1;

                CraftARUtils.copyAssetToInternalDir(context, image1);
                CraftARUtils.copyAssetToInternalDir(context, image2);
                image1 = context.getFilesDir().toString() + "/" + image1;
                image2 = context.getFilesDir().toString() + "/" + image2;
            }

            jsonObject.put("button_url", image1);
            jsonObject.put("button_pressed_url", image2);
            jsonObject.put("hyperlink_url", actionUrl);
            jsonObject.put("type", "image_button");


            CraftARContentImageButton imgButton = null;
            try {
                imgButton = new CraftARContentImageButton(jsonObject);
            } catch (CraftARSDKException e) {
                e.printStackTrace();
                return false;
            }

            String instanceId = "" + System.identityHashCode(imgButton);


            objectsHashMap.put(instanceId, imgButton);

            JSONObject eventResponse = CraftARUtils.createEventResponse("created", instanceId);
            CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);
        }

        else if ("contentModelInitWithTextures".equals(action)){
            String image1 = args.getString(0);
            JSONObject jsonTexturesObject = args.getJSONObject(1);
            Boolean isImagePath = args.getBoolean(2);

            JSONObject jsonObject = new JSONObject();

            JSONObject texturesParsed = null;
            if (isImagePath == true){
                image1 = CraftARPlugin.ANDROID_FILE + image1;
                Iterator keyIt = jsonTexturesObject.keys();
                texturesParsed = new JSONObject();

                while(keyIt.hasNext()){
                    String key =  (String) keyIt.next();
                    texturesParsed.put(key, CraftARPlugin.ANDROID_FILE + jsonTexturesObject.getString(key));
                }
            }

            else {
                texturesParsed = jsonTexturesObject;
            }

            jsonObject.put("model_url", image1);
            jsonObject.put("textures", texturesParsed);
            jsonObject.put("type", "3dmodel");

            CraftARContent3dmodel model3d = null;
            try {
                model3d = new CraftARContent3dmodel(jsonObject);
            } catch (CraftARSDKException e) {
                e.printStackTrace();
                return false;
            }

            objectsHashMap.put("" + System.identityHashCode(model3d), model3d);


            JSONObject eventResponse = CraftARUtils.createEventResponse("created", callbackContext.getCallbackId());
            CraftARUtils.sendResult(callbackContext, eventResponse, true, PluginResult.Status.OK);

        }


        else if ("contentSetWrapMode".equals(action)){
            String instanceId = args.getString(0);
            int wrapMode = args.getInt(1);
            CraftARContent content = (CraftARContent) objectsHashMap.get(instanceId);

            int wrap = 0;

             switch (wrapMode){
                 case 0:
                     wrap = CraftARContent.ContentWrapMode.WRAP_MODE_NONE;
                     break;

                 case 1:
                     wrap = CraftARContent.ContentWrapMode.WRAP_MODE_REF_WIDTH;
                     break;

                 case 2:
                     wrap = CraftARContent.ContentWrapMode.WRAP_MODE_SCALE_FILL;
                     break;

                 case 3:
                     wrap = CraftARContent.ContentWrapMode.WRAP_MODE_ASPECT_FILL;
                     break;

                 case 4:
                     wrap = CraftARContent.ContentWrapMode.WRAP_MODE_ASPECT_FIT;
                     break;

                 default:
                     wrap = CraftARContent.ContentWrapMode.WRAP_MODE_REF_WIDTH_FIXED;
                     break;

             }

            content.setWrapMode(wrap);
        }

        else if ("contentAddContent".equals(action)){
            String instanceId = args.getString(0);
            String itemInstanceId = args.getString(1);

            CraftARContent content = (CraftARContent) objectsHashMap.get(instanceId);
            CraftARItemAR item = (CraftARItemAR) objectsHashMap.get(itemInstanceId);
            item.addContent(content);
        }

        else if ("contentSetScale".equals(action)){
            String instanceId = args.getString(0);
            JSONArray array = args.getJSONArray(1);
            float matrix[] = new float[array.length()];

            for (int i = 0; i < array.length(); i++){
                matrix[i] = (float) array.getDouble(i);
            }

            CraftARContent content = (CraftARContent) objectsHashMap.get(instanceId);
            content.setScale(matrix);
        }

        else if ("contentSetTranslation".equals(action)){
            String instanceId = args.getString(0);
            JSONArray array = args.getJSONArray(1);
            float matrix[] = new float[array.length()];

            for (int i = 0; i < array.length(); i++){
                matrix[i] = (float) array.getDouble(i);
            }

            CraftARContent content = (CraftARContent) objectsHashMap.get(instanceId);
            content.setTranslation(matrix);
        }

        else if ("contentSetRotation".equals(action)){
            String instanceId = args.getString(0);
            JSONArray array = args.getJSONArray(1);
            float matrix[] = new float[array.length()];

            for (int i = 0; i < array.length(); i++){
                matrix[i] = (float) array.getDouble(i);
            }

            CraftARContent content = (CraftARContent) objectsHashMap.get(instanceId);
            content.setRotationMatrix(matrix);
        }

        else {
            b = false;
        }

        return b;
    }

    @Override
    public void onTouchIn(CraftARContent craftARContent) {

    }

    @Override
    public void onTouchOut(CraftARContent craftARContent) {

    }

    @Override
    public void onTouchDown(CraftARContent craftARContent) {

    }

    @Override
    public void onTouchUp(CraftARContent craftARContent) {

    }
}
