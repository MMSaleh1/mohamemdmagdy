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

/**
 * A CraftARImage represents an item's image. Image Recognition
 * Items may have one or several images representing the object.
 */
@interface CraftARImage : NSObject

- (id) initWithUUID: (NSString*) uuid andThumbnailURL: (NSString*) thumbnailURL;

/// UUID of the image
@property (nonatomic, readonly) NSString* uuid;

/// URL for the 60px thumbnail of the image
@property (nonatomic, readonly) NSString* thumbnail60Url;
/// URL for the 120px thumbnail of the image
@property (nonatomic, readonly) NSString* thumbnail120Url;
/// URL for the 320px thumbnail of the image
@property (nonatomic, readonly) NSString* thumbnail320Url;

@end
