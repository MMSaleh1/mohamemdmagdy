package com.catchoom.craftar;

//
// CraftARCordovaActivity.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.WindowManager;


import com.craftar.CraftARActivity;
import com.craftar.CraftARSDK;


public class CraftARCordovaActivity extends CraftARActivity implements CordovaInterface{


	public String loadUrl;
	public boolean onPreviewStarted = false;

	public void setCordovaPlugin(CraftARPlugin cordovaPlugin) {
		this.cordovaPlugin = cordovaPlugin;
	}

	CraftARPlugin cordovaPlugin;


	@Override
		public void onCreate(Bundle savedInstanceState) {
			super.onCreate(savedInstanceState);
			Intent intent = getIntent();		
			loadUrl  = intent.getStringExtra(CraftARIntent.EXTRA_CONNECT_URL);

			cordovaPlugin = CraftARPluginManager.getInstance().plugin;

			getWindow().clearFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
			getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,
					WindowManager.LayoutParams.FLAG_FULLSCREEN);
		}

	@Override
	public void onPostCreate() {

		Intent intent = getIntent();
		loadUrl  = intent.getStringExtra(CraftARIntent.EXTRA_CONNECT_URL);
		// Initialize the UI
		FakeR fakeR = new FakeR(this);


		int layoutId = fakeR.getId("layout", "craftar_camera");
		View layout = getLayoutInflater().inflate(layoutId, null);


		setContentView(layout);

        CraftARPluginManager.getInstance().initSDK(getApplicationContext(), this);
    }

	@Override
	public void onCameraOpenFailed() {
		cordovaPlugin.onCameraOpenFailed();
	}

	@Override
	public void onPreviewStarted(int i, int i1) {
		onPreviewStarted = true;
		cordovaPlugin.onPreviewStarted(i, i1);
	}


    @Override
    public void startActivityForResult(CordovaPlugin command, Intent intent, int requestCode) {

    }

    @Override
    public void setActivityResultCallback(CordovaPlugin plugin) {

	}

	@Override
		public Activity getActivity() {
			return this;
		}

	@Override
		public Object onMessage(String id, Object data) {
			return null;
		}

	@Override
		public ExecutorService getThreadPool() {
			return Executors.newCachedThreadPool();
		}

	@Override
	public void requestPermission(CordovaPlugin plugin, int requestCode, String permission) {

	}

	@Override
	public void requestPermissions(CordovaPlugin plugin, int requestCode, String[] permissions) {

	}

	@Override
	public boolean hasPermission(String permission) {
		return false;
	}

	@Override
	public void onDestroy() {
		cordovaPlugin.webView.handleDestroy();
		CraftARSDK.Instance().getCamera().stopCapture();
		super.onDestroy();
	}

}
