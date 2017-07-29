package com.catchoom.craftar;

//
// CatchoomLayout.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.text.TextUtils;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.widget.RelativeLayout;

import com.craftar.CraftARCameraView;

import org.apache.cordova.ConfigXmlParser;
import org.apache.cordova.CordovaInterfaceImpl;
import org.apache.cordova.CordovaPreferences;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewImpl;
import org.apache.cordova.PluginEntry;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;

import java.util.ArrayList;

public class CatchoomLayout extends RelativeLayout {
    LayoutInflater mInflater;
    CraftARCameraView cameraView;
    SystemWebView wv;
    public CordovaWebView cwv;
    public String loadUrl;

    protected CordovaPreferences preferences;
    protected ArrayList<PluginEntry> pluginEntries;
    protected CordovaInterfaceImpl cordovaInterface;

    public CatchoomLayout(Context context) {
        super(context);
        mInflater = LayoutInflater.from(context);
        init();
    }

    public CatchoomLayout(Context context, AttributeSet attrs) {
        super(context, attrs);
        mInflater = LayoutInflater.from(context);
        init();
    }

    public CatchoomLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        mInflater = LayoutInflater.from(context);
        init();
    }

    void init(){
        FakeR fakeR = new FakeR(getContext());

        int layoutId = fakeR.getId("layout", "catchoom_layout");
        View layout = mInflater.inflate(layoutId, this, true);
        initUI(layout, fakeR);
    }

    public boolean wasWebviewTouched(View v, MotionEvent event){
        boolean b = true;
        int x = (int)event.getX();
        int y = (int)event.getY();

        v.setDrawingCacheEnabled(true);
        Bitmap bitmap = Bitmap.createBitmap(v.getDrawingCache());
        v.setDrawingCacheEnabled(false);
        int pixelColor = bitmap.getPixel(x,y);

        if (pixelColor == Color.TRANSPARENT){
            b = false;
        }

        return b;
    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {

        boolean b = wasWebviewTouched(wv, ev);

        if (b){
            wv.dispatchTouchEvent(ev);
        } else {
            cameraView.dispatchTouchEvent(ev);

        }
        return super.onInterceptTouchEvent(ev);
    }

    void initUI(View layout, FakeR fakeR){
        Intent intent = getActivity().getIntent();
        loadUrl  = intent.getStringExtra(CraftARIntent.EXTRA_CONNECT_URL);

        int previewId = fakeR.getId("id", "craftar_preview");

        cameraView = (CraftARCameraView) layout.findViewById(previewId);
        wv = (SystemWebView)layout.findViewById(fakeR.getId("id", "OverlayView"));

        cordovaInterface = new CordovaInterfaceImpl((Activity) getContext());
        loadConfig();
        
        cwv = new CordovaWebViewImpl(new SystemWebViewEngine(wv));
        if (!cwv.isInitialized()){
            cwv.init(cordovaInterface, pluginEntries, preferences);
        }

        cwv.handleResume(true);

        if (!TextUtils.isEmpty(loadUrl)) {
            cwv.loadUrl(CraftARPlugin.ANDROID_FILE + loadUrl);
        }

        cwv.getView().setBackgroundColor(Color.TRANSPARENT);
    }

    Activity getActivity(){
        return (Activity) getContext();
    }

    protected void loadConfig() {
        ConfigXmlParser parser = new ConfigXmlParser();
        parser.parse(getActivity());
        preferences = parser.getPreferences();
        preferences.setPreferencesBundle(getActivity().getIntent().getExtras());
        pluginEntries = parser.getPluginEntries();
        // Config.parser = parser;
    }

}