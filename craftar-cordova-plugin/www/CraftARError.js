/* 
 * Copyright 2014 Niels Snoeck
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * 
 * The CraftARError object encapsulates CraftAR API errors.  
 * 
 * @constructor 
 * @param {number} code
 *     The error code.
 * @param {string} message
 *     The error message.
 */
var CraftARError = function(code, message) {
	this.code = code || null;
	this.message = message || null;
}

/** Server error */
CraftARError.SERVER_ERROR 				= 1;
/** Token does not exist */
CraftARError.TOKEN_WRONG				= 2;
/** Token is invalid, tokens must be 16 aphanumerical characters */
CraftARError.TOKEN_INVALID				= 3;
/** No image was sent to the server */
CraftARError.IMAGE_NOT_LOADED			= 4;
/** The image is plain (the camera is covered or pointing to a white table, for instance) */
CraftARError.IMAGE_NO_DETAILS			= 5;
/** The image sent is too large */
CraftARError.IMAGE_TOO_LARGE			= 6;
/** The image sent is too small */
CraftARError.IMAGE_TOO_SMALL			= 7;
/** The image sent is a png with transparency, this is not supported. */
CraftARError.IMAGE_TRANSPARENCY			= 8;
/** No token was not sent to the server */
CraftARError.TOKEN_MISSING				= 9;
/** No image was not sent to the server */
CraftARError.IMAGE_MISSING				= 10;
/** Could not connect to the server */
CraftARError.CONNECTION_ERROR			= 11;
/** Unexpected response from server received */
CraftARError.INVALID_SERVER_RESPONSE	= 12;
/** Unexpected response from server received */
CraftARError.INVALID_CRAFTAR_JSON		= 13;
/** Unknown error */
CraftARError.UNKNOWN					= 14;

/** Camera capture could not be opened */
CraftARError.CAPTURE_ERROR				= 15;
/** Error in the CraftAR plugin */
CraftARError.PLUGIN_ERROR				= 16;
CraftARError.CANCELED					= 17;

module.exports = CraftARError;