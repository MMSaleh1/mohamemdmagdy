package com.catchoom.craftar;

//
// CraftARPluginManager.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import android.content.Context;
import com.craftar.CraftARActivity;
import com.craftar.CraftARCloudRecognition;
import com.craftar.CraftARSDK;
import com.craftar.CraftARTracking;
import com.craftar.SearchController;

import java.util.ArrayList;
import java.util.HashMap;

public class CraftARPluginManager {
    ArrayList<CatchoomPluginInterface> catchoomPlugins = new ArrayList<CatchoomPluginInterface>();
    public boolean onPreviewStarted = false;
    public CraftARPlugin plugin;

    private static CraftARPluginManager ourInstance = new CraftARPluginManager();

    public static CraftARPluginManager getInstance() {
        return ourInstance;
    }

    private CraftARPluginManager() {
        catchoomPlugins = new ArrayList<CatchoomPluginInterface>();

    }

    public void init(HashMap<String, Object> objects, CraftARActivity act, CraftARPlugin plugin){
        this.plugin = plugin;

        CraftARFinderPlugin fp = new CraftARFinderPlugin(objects, act);
        CraftARCloudIRPlugin cp = new CraftARCloudIRPlugin(objects);
        CraftARTrackingPlugin tp = new CraftARTrackingPlugin(objects);
        CraftARCollectionManagerPlugin cc = new CraftARCollectionManagerPlugin(objects);
        CraftARContentPlugin cop = new CraftARContentPlugin(objects, act.getApplicationContext(), plugin.cordova);

        cp.addObserver(tp);

        catchoomPlugins.add(fp);
        catchoomPlugins.add(cp);
        catchoomPlugins.add(tp);
        catchoomPlugins.add(cc);
        catchoomPlugins.add(cop);
    }

    ArrayList<CatchoomPluginInterface> getPlugins(){
        return catchoomPlugins;
    }

    public void initSDK(Context context, CraftARActivity activity){
        CraftARSDK.Instance().init(context);
        CraftARSDK.Instance().startCapture(activity);
        CraftARTracking.Instance();
        CraftARSDK.Instance().setSearchController(CraftARCloudRecognition.Instance().getSearchController());
    }

    public void startCapture(CraftARActivity activity){

        if(((CraftARCordovaActivity)activity).onPreviewStarted && !plugin.previewStartedDone) {
            plugin.onPreviewStarted(0, 0);
        }
    }

    public void setSearchController(SearchController searchController){
        //CraftARSDK.Instance().setSearchController((SearchController) objectsHashMap.get(args.getString(0)));
    }

}
