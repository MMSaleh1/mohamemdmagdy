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
#import <UIKit/UIKit.h>
#import "CraftARProtocols.h"
#import "CraftARCamera.h"

@protocol CraftARSDKProtocol;

/**
 * The CraftARSDK class is the main controller for managing the camera capture and
 * the visual search operations (Single shot and Finder Mode search)
 */
@interface CraftARSDK : NSObject

/// Delegate that will receive SDK's callbacks
@property (nonatomic, weak) id <CraftARSDKProtocol> delegate;

/**
 * Delegate that will receive messages to perform visual search based on the
 * SDK commands (singleShotSearch, startFinder, stopFinder).
 */
@property (nonatomic, weak) id <CameraSearchController> searchControllerDelegate;

/**
 * Get the shared instance of the CraftARSDK for image recognition.
 */
+ (CraftARSDK*) sharedCraftARSDK;

/**
 * Initialize a camera capture for a given UIView.
 * @param previewView View where the camera preview will be shown. The SDK will draw the capture preview.
 * Any other contents added to this view will be ignored.
 */
- (void) startCaptureWithView: (UIView*) previewView;

/**
 * Stop the camera video capture.
 * The camera will stop generating didReceivePreviewFrame events, all the camera resources will be released.
 * Call this method when closing the View controller that opens the camera (on viewWillDisappear is recommended).
 */
- (void) stopCapture;

/**
 * Takes a picture and performs a visual search using the searchControllerDelegate
 */
- (void) singleShotSearch;

/**
 * Starts a visual search session in Finder Mode passing the camera capture frames
 * to the searchControllerDelegate.
 */
- (void) startFinder;

/**
 * Starts a visual search session in Finder Mode passing the camera capture frames
 * to the searchControllerDelegate. The Finder stops after timeoutSeconds and the
 * [delegate didGetFinderTimeout] message is sent to the delegate.
 * Calling stopFinder cancels the notification.
 */
- (void) startFinderWithTimeout: (NSTimeInterval) timeoutSeconds;

/**
 * Stops the visual search session if started.
 */
- (void) stopFinder;

/**
 * Returns whether the SDK's Finder mode search is running
 */
- (BOOL) isFinding;

/**
 * Returns the CraftAR camera object that provides access to camera level operations.
 */
- (CraftARCamera*) getCamera;

@end



@protocol CraftARSDKProtocol <NSObject>

/**
 * Sent by the SDK after the video capture and preview have started.
 */
- (void) didStartCapture;

@optional
/**
 * Sent by the SDK when the Finder timeout is received.
 */
- (void) didGetFinderTimeout;

@end


