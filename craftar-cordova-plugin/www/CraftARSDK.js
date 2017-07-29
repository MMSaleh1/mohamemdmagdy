//
//  CraftARSDK.js
//
//  Created by Daniel Cabrera on 2016.
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = "CraftAR";

/**
 * The CraftAR camera allows to pause, restart and trigger the focus
 * 
 * @constructor
 */
function CraftARCamera() {}

/**
 * Pauses the camera captrue
 */
CraftARCamera.prototype.pauseCapture = function() {
    exec(null, null, PLUGIN_NAME, "pauseCapture", []);
}

/**
 * Restarts the camera captrue after it has been paused
 */
CraftARCamera.prototype.restartCapture = function() {
    exec(null, null, PLUGIN_NAME, "restartCapture", []);
}

/**
 * Check if the camera is capturing
 * @return true if the camera capture is running
 */
CraftARCamera.prototype.isCapturing = function() {
    exec(null, null, PLUGIN_NAME, "isCapturing", []);
}

/**
 * Triggers the autofocus feature if the device supports it
 */
CraftARCamera.prototype.triggerFocus = function() {
    exec(null, null, PLUGIN_NAME, "triggerFocus", []);
}

/**
 * 
 * The CraftAR object exposes an interface to the CraftAR image recognition service.
 * 
 * @constructor
 */
function CraftARSDK() {
    this.isFinding = false;
    exec(this.didStartCapture.bind(this), this.didGetFinderTimeout.bind(this), PLUGIN_NAME, "craftARSDKProtocol", []); 
}


CraftARSDK.prototype._searchController = null;


/**
 * 
 * Open a View with a CraftAR camera. This is required to start
 * the Plugin. You always need to start a view to be able to use the CraftAR Plugin
 * 
 * @param {function()} success
 *     Callback function executed on success.
 * @param {function(CraftARError)} error
 *     Callback function executed on error. 
 *     The first argument is a CatchoomError object.
 * @param {CraftAROptions} options
 *     The CraftAR options.
 *     {"loadUrl":"YOUR_PAGE_WITH_CRAFTAR.html"}
 */
CraftARSDK.prototype.startView = function(success, error, options) {	
	exec(success, error, PLUGIN_NAME, "startView", [options]);	
}

/**
 * Close the catchoom camera view
 */
CraftARSDK.prototype.closeView = function(success, error) {
 exec(success, error, PLUGIN_NAME, "closeView", []);	
}

CraftARSDK.prototype.stopCapture = function() {
    exec(null, null, PLUGIN_NAME, "stopCapture", []);
}

/**
 * Call to start the capture or after the capture
 * was frozen.
 * Triggers a callback when the capture has started
 * @see CraftARSDK#onStartCapture
 */
CraftARSDK.prototype.startCapture = function() {
    exec(null, null, PLUGIN_NAME, "startCapture", []);
}

/**
 * Takes a picture and performs a Cloud Image Recognition search
 * to the CraftAR service. I
 */
CraftARSDK.prototype.singleShotSearch = function() {
    exec(null, null, PLUGIN_NAME, "singleShotSearch", []);
}

/**
 * Starts a visual search session in Finder Mode passing the camera capture frames to the searchControllerDelegate.
 */
CraftARSDK.prototype.startFinder = function() {
    this.isFinding = true;
    exec(null, null, PLUGIN_NAME, "startFinder", []);
}

/**
 * Starts a visual search session in Finder Mode passing the camera capture frames to the searchControllerDelegate. The Finder stops after timeoutSeconds and the callback is called. Calling stopFinder cancels the notification.
 * @param timeout seconds to wait until before giving up
 * @param callback called when the time is over
 */
CraftARSDK.prototype.startFinderWithTimeout = function(timeout, callback) {
    exec(callback, null, PLUGIN_NAME, "startFinder", [timeout]);
}

/**
 * Stops the visual search session if started.
 */
CraftARSDK.prototype.stopFinder = function() {
    this.isFinding = false;
    exec(null, null, PLUGIN_NAME, "stopFinder", []);
}


/**
 * Returns whether the SDK's Finder mode search is running
 */
CraftARSDK.prototype.isFinding = function() {
    return isFinding;
}


/**
 * @name CraftARSDK#searchController
 * @description The search controller is in charge of performing searches using images
 * coming from the camera (either from the Finder Mode or the Single shot search)
 * Set this to the CraftARCloudRecognition.searchController to use the Cloud recognition.
 * @see CraftARCloudRecognition#searchController
 */
Object.defineProperty(CraftARSDK.prototype, 'searchController', {
    get: function() {
      return this._searchController;
    },
    set: function(value) {
    this._searchController = value;
    exec(null, null, PLUGIN_NAME, "setSearchController", [value.instanceId]);
    }
});

CraftARSDK.prototype._onStartCapture = null;
CraftARSDK.prototype._onFinderTimeout = null;

CraftARSDK.prototype.didStartCapture = function (error) {
    if(this._onStartCapture != null) {
        this._onStartCapture(error);
    }
}

CraftARSDK.prototype.didGetFinderTimeout = function (result) {
    if(this._onFinderTimeout != null) {
        this._onFinderTimeout(result);
    }
}


/**
 * Set a callback for when the camera capture has started
 * @see CraftARSDK#startCapture
 */
CraftARSDK.prototype.onStartCapture = function(func) {    
    this._onStartCapture = func;
}


CraftARSDK.prototype.onFinderTimeout = function(func) {  
    this._onFinderTimeout = func;
}


/**
 * Returns the CraftAR camera object that provides access to camera level operations.
 */
CraftARSDK.prototype.getCamera = new CraftARCamera();



module.exports = new CraftARSDK();
