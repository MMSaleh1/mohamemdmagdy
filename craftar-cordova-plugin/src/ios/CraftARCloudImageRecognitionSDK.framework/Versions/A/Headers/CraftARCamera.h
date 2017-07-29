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
#import <AVFoundation/AVFoundation.h>
#import "CraftARProtocols.h"

/**
 * Class that allows basic control of the device's camera
 */
@interface CraftARCamera : NSObject

/// Delegate that will receive the camera events
@property (nonatomic, weak) id <CameraEventsProtocol> delegate;

/**
 * Pause the camera video capture.
 * The camera will stop generating didReceivePreviewFrame events.
 */
- (void) pauseCapture;

/**
 * Restart the camera video capture
 * If the camera capture was open, the capture is reinitialized.
 */
- (void) restartCapture;

/**
 * Returns true if the camera capture is running (not paused)
 */
- (BOOL) isCapturing;

/**
 * Take a picture. Will trigger didTakePicture.
 */
- (void) takePicture;

/**
 * Runs a passed block with the camera device as parameter if the capture session is active.
 * Does nothing if the camera is not capturing.
 */
- (void) runConfigurationBlock: (void (^)(AVCaptureDevice* camera)) configurationBlock;

/**
 * Set the capture preset (video capture size)
 * @param avCaptureSessionPreset AVCaptureSessionPreset1280x720 by default.
 * Note: supported capture presets are AVCaptureSessionPreset1280x720 and AVCaptureSessionPreset640x480
 */
+ (void) setCapturePreset: (NSString*) avCaptureSessionPreset;

/**
 * Limit the maximum FPS from the camera
 * @param maxFPS 60 by default
 * Note: The maximum FPS is set by default to choose the best camera configuration possible
 * for AR. If the camera capture appears too dark, this setting can control the aperture time of the camera.
 */
+ (void) setCaptureMaxFPS: (int) maxFPS;

@end
