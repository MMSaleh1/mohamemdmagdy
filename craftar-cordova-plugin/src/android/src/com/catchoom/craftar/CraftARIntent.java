
package com.catchoom.craftar;

//
// CraftARIntent.java
//
// Created by Daniel Cabrera a on 2016.
// Infinity Source S.L.
//

import android.content.Intent;

/**
 * 
 * Intent extra names for the CraftAR plugin 
 */
public class CraftARIntent extends Intent {

	/**
	 * 
	 * A token String of a collection to search 
	 * during image recognition activities.
	 */
	public static final String EXTRA_TOKEN = 
			"com.catchoom.craftar.token";
	
	/**
	 * 
	 * An optional hint String to display at the top of  
	 * the screen during image recognition activities. 
	 */
	public static final String EXTRA_HINT =
			"com.catchoom.craftar.hint";
	
	/**
	 * 
	 * An optional boolean indicating whether image recognition
	 * should be performed in single shot mode. 
	 */
	public static final String EXTRA_SINGLE_SHOT =
			"com.catchoom.craftar.singleshot";
	
	/**
	 * 
	 * An optional boolean indication of whether bounding boxes should  
	 * be included in the response of image recognition activities. 
	 */
	public static final String EXTRA_BBOXES = 
			"com.catchoom.craftar.bboxes";

	/**
	 * 
	 * An optional boolean indication of whether custom data should  
	 * be embedded in response of image recognition activities. 
	 */
	public static final String EXTRA_EMBED_CUSTOM = 
			"com.catchoom.craftar.embedCustom";
	
	/**
	 * 
	 * An optional proxy URL String pointing to an  
	 * endpoint that can receive timestamp requests.
	 */
	public static final String EXTRA_CONNECT_URL = 
			"com.catchoom.craftar.connectUrl";
	
	/**
	 * 
	 * An optional proxy URL String pointing to an 
	 * endpoint that can receive image search requests.
	 */	
	public static final String EXTRA_SEARCH_URL = 
			"com.catchoom.craftar.searchUrl";
	
	/**
	 * 
	 * An ArrayList of image recognition results, in which
	 * each list item is a CraftARSearchResponseItem object.  
	 */	
	public static final String EXTRA_ITEMS = 
			"com.catchoom.craftar.items";
	
	/**
	 * 
	 * The integer code of an error that occurred  
	 * during an image recognition activity. 
	 */	
	public static final String EXTRA_ERROR_CODE = 
			"com.catchoom.craftar.errorCode";
	
	/**
	 * 
	 * The message String of an error that occurred  
	 * during an image recognition activity. 
	 */	
	public static final String EXTRA_ERROR_MESSAGE = 
			"com.catchoom.craftar.errorMessage";

}
