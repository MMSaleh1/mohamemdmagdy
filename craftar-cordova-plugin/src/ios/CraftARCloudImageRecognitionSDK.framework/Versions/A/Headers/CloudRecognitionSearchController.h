//
//  CloudRecognitionSearchController.h
//  CraftARCloudRecognition
//
//  Created by Luis Martinell Andreu on 12/11/15.
//  Copyright © 2015 Luis Martinell Andreu. All rights reserved.
//

#import "BaseSearchController.h"

@class CraftARCloudRecognition;

@interface CloudRecognitionSearchController : BaseSearchController

- (id) initWithCloudIR: (CraftARCloudRecognition*) cloudIR;

/**
 * Modify the rate at which this SearchController performs searches.
 *
 * This SearchController will search only when there are no previous petitions pending.
 * @param periodMs requested period in ms (must be >= 500ms , which means a maximum of 2 requests/second).
 * @return true if the search period was succesfully modified, false otherwise.
 * **/
- (bool) setSearchPeriod: (int) periodMs;

/**
 * Set the maximum number of search requests per second to be sent in Finder Mode.
 * @param searchesPerSecond should be a value greater than 0 and not higher than 2.0
 * The default value is 2.0
 */
- (void) setMaxSearchesPerSecond: (float) searchesPerSecond __deprecated;

/**
 * In Finder Mode, whether to allow searcg requests to be accumulated in a queue
 * or wait for the request in progress to finish before sending a new one.
 * False by default.
 */
@property (nonatomic, readwrite) BOOL mAccumulateSearches;

@end
