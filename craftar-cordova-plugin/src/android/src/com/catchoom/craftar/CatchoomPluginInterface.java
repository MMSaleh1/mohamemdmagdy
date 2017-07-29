package com.catchoom.craftar;

//
// CatchoomPluginInterface.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import org.apache.cordova.CallbackContext;
import org.json.JSONArray;
import org.json.JSONException;


public interface CatchoomPluginInterface {
     boolean execute(String action, JSONArray args,
                                     CallbackContext callbackContext) throws JSONException;
}
