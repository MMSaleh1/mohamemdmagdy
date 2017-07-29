// This file is free software. You may use it under the MIT license, which is copied
// below and available at http://opensource.org/licenses/MIT
//
// Copyright (c) 2015 Catchoom Technologies S.L.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
// Software, and to permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
// INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
// PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// DEALINGS IN THE SOFTWARE.

#import <Foundation/Foundation.h>


extern NSString* craftARCollectionManagerErrorDomain;
extern NSString* craftARCollectionErrorDomain;
extern NSString* craftARCraftAROnDeviceIRErrorDomain;

/**
 * Error identifying the problem
 */
typedef NS_ENUM(NSUInteger, CraftARErrorCodes) {
    UNKNOWN_ERROR,
    INTERNAL_ERROR,
    
    // COLLECTION MANAGER
    COLLECTION_MANAGER_EXTRACT_ERROR,
    COLLECTION_MANAGER_DELETE_ERROR,
    COLLECTION_MANAGER_INVALID_PARAMS,
    COLLECTION_MANAGER_SYNC_ERROR,
    
    // COLLECTIONS
    COLLECTION_NOT_FOUND,
    COLLECTION_MISSING_FILES,
    COLLECTION_INVALID,
    COLLECTION_INVALID_ITEM,
    COLLECTION_ITEM_NOT_FOUND,
    COLLECTION_BUNDLE_VERSION_IS_OLD,
    COLLECTION_BUNDLE_SDK_VERSION_IS_OLD,
    
    // On-Device Image Recognition
    ON_DEVICE_IR_COLLECTION_NOT_FOUND,
    ON_DEVICE_IR_NO_ACTIVE_COLLECTION,

    // Image Recognition Errors
    SEARCH_ERROR_IMAGE_NO_DETAILS,
    SEARCH_ERROR_IMAGE_TOO_SMALL,
    SEARCH_ERROR_READING_FILE,
    SEARCH_ERROR_IMAGE_HAS_TRANSPARENCY,
    
    // CraftAR Service Errors
    CRAFTAR_MISSING_TOKEN,
    CRAFTAR_WRONG_TOKEN_FORMAT,
    CRAFTAR_INVALID_TOKEN,
    CRAFTAR_SDK_VERSION_APP_ID_NOT_FOUND,
    
    // AR errors
    CRAFTAR_ITEM_AR_ERROR_UNKNOWN,
    CRAFTAR_ITEM_AR_ALREADY_ADDED,
    CRAFTAR_ITEM_AR_ERROR_INTERNAL,
    CRAFTAR_ITEM_AR_ERROR_INVALID_DATA,
    CRAFTAR_ITEM_AR_ERROR_DATA_GENERATING,
    CRAFTAR_ITEM_AR_ERROR_LIMIT_EXCEEDED,
    CRAFTAR_ITEM_AR_ERROR_WRONG_LICENSE,
    
} ;


/**
 * The CraftARError class encapsulates all kinds of errors that can be 
 * produced by the SDK.
 */
@interface CraftARError : NSError

///@cond
+ (CraftARError*) errorWithDomain: (NSString*) domain codeString: (NSString *) errorCodeString andMessage: (NSString *) message;
+ (CraftARError*) errorWithDomain: (NSString*) domain code: (int) errorCode andMessage: (NSString*)message;
///@endcond

@end
