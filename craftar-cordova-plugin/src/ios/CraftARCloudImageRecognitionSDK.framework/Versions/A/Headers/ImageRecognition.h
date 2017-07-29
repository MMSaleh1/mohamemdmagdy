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
#import "CraftARQueryImage.h"
#import "CraftARSearchResult.h"
#import "CraftARError.h"
#import "CraftARProtocols.h"

/**
 * Base class for Image Recognition implementations
 */
@interface ImageRecognition : NSObject

/**
 * Perform an Image Recognition search
 * @param image CraftARQueryImage to use for the recognition search.
 * @param onResultBlock Executed with an NSArray of CraftARSearchResults if the search took place.
 * @param onError Executed with a CraftARError if an error happened during recognition.
 */
- (void) searchWithImage: (CraftARQueryImage*)image withOnResults: (void(^)(NSArray* results)) onResultBlock andOnError: (void(^)(NSError *error)) onErrorBlock;

/**
 * Perform an Image Recognition search
 * @param image CraftARQueryImage to use for the recognition search.
 * @param requestCode Request identifier passed back on the callbacks
 * @param onResultBlock Executed with an NSArray of CraftARSearchResults if the search took place.
 * @param onError Executed with a CraftARError if an error happened during recognition.
 */
- (void) searchWithImage: (CraftARQueryImage*)image andRequestCode: (NSInteger)requestCode withOnResults: (void(^)(NSArray* results, NSInteger requestCode)) onResultBlock andOnError: (void(^)(NSError *error, NSInteger requestCode)) onErrorBlock;

/**
 * Returns the number of searches that are queued or being processed.
 */
- (int) getCurrentSearchCount;

/**
 * The ImageRecognition delegate will receive the search result callbacks 
 */
@property (nonatomic, weak) id <SearchProtocol> delegate;

@end
