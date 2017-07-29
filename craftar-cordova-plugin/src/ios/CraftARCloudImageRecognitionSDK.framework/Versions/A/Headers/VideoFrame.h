//
//  VideoFrame.h
//  CraftAR-sdk
//
//  Created by Luis Martinell Andreu on 5/29/13.
//  Copyright (c) 2013 Catchoom. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CoreMedia/CoreMedia.h>

@interface VideoFrame : NSObject

@property (nonatomic, readonly) NSInteger width;
@property (nonatomic, readonly) NSInteger height;
@property (nonatomic, readonly) NSInteger bytesPerRow;

/**
 * Process a video frame in a code block.
 * This method must be called from the didReceivePreviewFrame callback from the Camera or the ImageRecognition protocols.
 */
- (void) processVideoFrameWithBlock: (void(^)(VideoFrame* frame, unsigned char *bgraBytes)) processBlock;

@end;