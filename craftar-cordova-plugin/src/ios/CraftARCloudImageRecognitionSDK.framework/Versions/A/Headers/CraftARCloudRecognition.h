//
//  CraftARCloudRecognition.h
//  CraftARCloudRecognition
//
//  Created by Luis Martinell Andreu on 28/07/15.
//  Copyright (c) 2015 Luis Martinell Andreu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ImageRecognition.h"
#import "CloudRecognitionSearchController.h"

@interface CraftARCloudRecognition : ImageRecognition

/**
 * Get the singleton instance of the CloudImageRecognition
 */
+ (CraftARCloudRecognition*) sharedCloudImageRecognition;


/// Retrieve the bounding boxes for each item found
/**
 Default value: false
 @see http://catchoom.com/documentation/api/bounding-boxes/
 */
@property (nonatomic, readwrite) bool retrieveBoundingBox;

/// Embed the custom field for each item found
/**
 Default value: false
 @see CraftARCloudRecognitionItem
 @see http://catchoom.com/documentation/api/custom-data/
 */
@property (nonatomic, readwrite) bool embedCustomField;


/**
 * Sets an active collection for OnDevice Image Recognition
 * @param collectionToken Token from the collection to be set as active.
 * @param onSuccess Executed when the collection has set and is ready for Recognition.
 * @param onError Executed in case of error.
 */
- (void) setCollectionWithToken: (NSString*)collectionToken onSuccess: (void(^)(void)) onSuccessBlock andOnError: (void(^)(NSError *error)) onErrorBlock;


/**
 * Perform a Cloud Image Recognition search
 * @param image CraftARQueryImage to use for the recognition search.
 * @param onResultBlock Executed with an NSArray of CraftARSearchResults if the search took place.
 * @param onError Executed with a CraftARError if an error happened during recognition.
 */
- (void) searchWithImage:(CraftARQueryImage *)image withOnResults:(void (^)(NSArray * results))onResultBlock andOnError:(void (^)(NSError *error))onErrorBlock;


/**
 * Perform an Image Recognition search
 * @param image CraftARQueryImage to use for the recognition search.
 * @param requestCode Request identifier passed back on the callbacks
 * @param onResultBlock Executed with an NSArray of CraftARSearchResults if the search took place.
 * @param onError Executed with a CraftARError if an error happened during recognition.
 */
- (void) searchWithImage: (CraftARQueryImage*)image andRequestCode: (NSInteger)requestCode withOnResults: (void(^)(NSArray* results, NSInteger requestCode)) onResultBlock andOnError: (void(^)(NSError *error, NSInteger requestCode)) onErrorBlock;


/**
 * The search controller for the Cloud Image Recognition
 */
@property (nonatomic, readonly) CloudRecognitionSearchController* mSearchController;

@end
