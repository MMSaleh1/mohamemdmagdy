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
#import "VideoFrame.h"
#import "CraftARError.h"

/**
 * Protocol used to receive Visual search responses from an ImageRecognition class.
 */
@protocol SearchProtocol <NSObject>

/**
 * Called when the ImageRecognition class gets some results
 */
- (void) didGetSearchResults: (NSArray*) results;

/**
 * Called when an error is produced during visual recognition.
 */
- (void) didFailSearchWithError: (NSError*) error;

@end

/**
 * Protocol used to receive camera events
 */
@protocol CameraEventsProtocol <NSObject>

/**
 * Sent when the camera took a picture as respose to [CraftARCamera takePicture]
 */
- (void) didTakePicture: (UIImage*) image;

/**
 * Used for Finder Mode searches to receive the camera frames.
 * @param image The video frame containing the image captured by the camera. Do not keep references to this image.
 * @note If you need a copy of the videoFrame use the CraftARQueryImage. Don't to this for every frame. 
 */
- (void) didReceivePreviewFrame: (VideoFrame*) image;

@end

/**
 * Protocol implemented by the ImageRecognition classes to manage
 * the Single shot and Finder Mode searches.
 */
@protocol CameraSearchController <CameraEventsProtocol>

/**
 * Called to activate the finder mode search
 */
- (void) didActivateFinderMode;

/**
 * Called to deactivate the finder mode search
 */
- (void) didDeactivateFinderMode;


/**
 * Called know if the finder mode is active
 */
- (BOOL) isFinding;

@end
