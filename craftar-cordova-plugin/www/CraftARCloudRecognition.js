//
//  CraftARCloudRecognition.js
//
//  Created by Daniel Cabrera on 2016.
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

var exec = require('cordova/exec');
var PLUGIN_NAME = "CraftAR";

/**
 * The CraftARCloudRecognition exposes the interface to perform Cloud Recognition Searches using
 * the CraftAR Service.
 * @constructor
 */
function CraftARCloudRecognition() {
		exec(this.searchResult.bind(this), this.searchError.bind(this), PLUGIN_NAME, "searchProtocol", []);
}

CraftARCloudRecognition.prototype._onSearchResult = null;
CraftARCloudRecognition.prototype._onSearchError = null;

/**
 * Search controller for the CraftAR Cloud Recognition module
 * @see CraftARSDK#searchController
 */
CraftARCloudRecognition.prototype.searchController = {"instanceId":"CRSEARCHCONTROLLER"};

CraftARCloudRecognition.prototype.searchError = function (error) {
	if(this._onSearchError != null) {
		this._onSearchError(error);
	}
}

CraftARCloudRecognition.prototype.searchResult = function (result) {
	if(this._onSearchResult != null) {
		this._onSearchResult(result);
	}
}

/**
 * Request bounding boxes in the search requests
 */
CraftARCloudRecognition.prototype.setRequestBoundingBoxes = function(boundingBoxes) {
    exec(null, null, PLUGIN_NAME, "setRequestBoundingBoxes", [boundingBoxes]);
}

/**
 * Embed custom data in the search responses
 */
CraftARCloudRecognition.prototype.setEmbedCustom = function(embedCustom) {
    exec(null, null, PLUGIN_NAME, "setEmbedCustom", [embedCustom]);
}

/**
 * Set collection with a token before start searching
 */
CraftARCloudRecognition.prototype.setCollectionWithToken = function(token, success, error) {
    exec(success, error, PLUGIN_NAME, "setCollectionWithToken", [token]);
}

/**
 * Perform a Cloud recognition search passing an image
 */
CraftARCloudRecognition.prototype.searchWithImage = function(base64Image, success, error) {
    exec(success, error, PLUGIN_NAME, "searchWithImage", [base64Image]);
}

/**
 * Set a callback to receive search results.
 */
CraftARCloudRecognition.prototype.onSearchResults = function(func) {
	this._onSearchResult = func;
}

/**
 * Set a callback to receive search errors.
 */
CraftARCloudRecognition.prototype.onSearchError = function(func) {
	this._onSearchError = func;
}

CraftARCloudRecognition.prototype.searchProtocolDelegate = function(object) {
	this.searchProtocol(this.didGetSearchResults,this.didFailSearchWithError);
}

/**
 * Change the search URL to use a proxy server
 */
CraftARCloudRecognition.prototype.setSearchURL = function(url){
    exec(null, null, PLUGIN_NAME, "setSearchURL", [url]);
}

/**
 * Change the connect URL to use a proxy server.
 * the connect URL is used when calling setCollectionWithToken
 */
CraftARCloudRecognition.prototype.setConnectURL = function(url){
    exec(null, null, PLUGIN_NAME, "setConnectURL", [url]);
}


/**
 * Modify the rate at which the CloudRecognition performs searches.
 * The CloudRecognition will search only when there are no previous petitions pending.
 * @param periodMs requested period in ms (must be >= 500ms , which means a maximum of 2 requests/second).
 */
CraftARCloudRecognition.prototype.setSearchPeriod = function(searchPeriodMS){
    exec(null, null, PLUGIN_NAME, "setSearchPeriod", [searchPeriodMS]);
}

module.exports = new CraftARCloudRecognition();