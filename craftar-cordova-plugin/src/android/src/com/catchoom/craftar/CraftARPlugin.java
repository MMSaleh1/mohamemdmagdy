
package com.catchoom.craftar;

//
// CraftARPlugin.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import java.lang.reflect.Constructor;
import java.util.HashMap;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.craftar.CraftARSDK;
import com.craftar.CraftARActivity;

/**
 * 
 * Cordova plugin class for recognizing images with the CraftAR API
 */
public class CraftARPlugin extends CordovaPlugin  {


	public static final int CV_REQUEST = 1;
    public final static String DEFAULT_OVERLAY = "catchoom_index.html";
    public final static String ANDROID_FILE = "file:///android_asset/www/";

    protected CallbackContext callbackContext;

    HashMap<String, Object> objectsHashMap;
    HashMap<Integer, CallbackContext> callbackContextHashMap;

	
	/**
	 * 
	 * The application context in which we're running
	 */

    Context context;
	Activity activity;


    CallbackContext craftARSDKCallbackContext;




    public void initialize(CordovaInterface cordova, final CordovaWebView webView) {
		super.initialize(cordova, webView);
		activity = cordova.getActivity();
		context = cordova.getActivity().getApplicationContext();

        if(activity instanceof CraftARCordovaActivity){
            ((CraftARCordovaActivity) activity).setCordovaPlugin(this);

            objectsHashMap = new HashMap<String, Object>();
            callbackContextHashMap = new HashMap<Integer, CallbackContext>();

            CraftARPluginManager.getInstance().init(objectsHashMap, (CraftARActivity) activity, this);

        }

	}


	@Override
	public boolean execute(String action, JSONArray args, 
			CallbackContext callbackContext) throws JSONException {

        boolean b = true;

        // Store our contexts
		this.callbackContext = callbackContext;
		this.context = cordova.getActivity().getApplicationContext();

		// Perform the requested action

        if ("createInstance".equals(action)){

            Object object = null;

            try {
                Class<?> c = Class.forName(args.getString(0));
                Constructor<?> ctor = c.getConstructor(CallbackContext.class);
                object = ctor.newInstance(new Object[]{callbackContext});
            } catch (Exception e) {
                callbackContext.error(e.getMessage());
            }

            objectsHashMap.put(callbackContext.getCallbackId(), object);

            JSONObject jsonObject = new JSONObject();

            try {
                jsonObject.put("event", "created");
                jsonObject.put("result", callbackContext.getCallbackId());
            } catch (JSONException e) {
                e.printStackTrace();
            }

            PluginResult result = new PluginResult(PluginResult.Status.OK, jsonObject);
            callbackContext.sendPluginResult(result);
        }

        else if ("destroyInstance".equals(action)){
            objectsHashMap.remove(args.getString(0));
        }

		else if ("startView".equals(action)) {
            String  loadUrl  = null;
            JSONObject options = args.optJSONObject(0);
            if (options != null) {
                loadUrl  = options.optString("loadUrl", loadUrl);
            } else {
                loadUrl = DEFAULT_OVERLAY;
            }

			startView(loadUrl);
		}

        else if ("closeView".equals(action)){
            CraftARSDK.Instance().stopFinder();
            activity.finish();
        }



        else if ("craftARSDKProtocol".equals(action)){
            craftARSDKCallbackContext = callbackContext;
        }

        else {
            b = false;
            for (CatchoomPluginInterface catchoomPlugin : CraftARPluginManager.getInstance().getPlugins()) {
                if (catchoomPlugin.execute(action, args, callbackContext)) {
                    b = true;
                    break;
                }
            }
        }

        return b;
	}

    public boolean cameraInit = false;
	
	/**
	 * 
	 * Start craftar camera view
	 * 
	 * @param loadUrl
	 *     Overlay url.
	 */
	protected void startView(String loadUrl) {
		
		Intent intent = new Intent(context, CraftARCordovaActivity.class);	
		intent.putExtra(CraftARIntent.EXTRA_CONNECT_URL, loadUrl);
        activity.startActivity(intent);
	}


    public void onCameraOpenFailed() {
        if(craftARSDKCallbackContext != null){
            craftARSDKCallbackContext.error("");
        }
    }


    public boolean previewStartedDone = false;
    public synchronized void onPreviewStarted(int i, int i1) {
        if(craftARSDKCallbackContext != null){
            previewStartedDone = true;
            craftARSDKCallbackContext.success();
        }
    }

}
