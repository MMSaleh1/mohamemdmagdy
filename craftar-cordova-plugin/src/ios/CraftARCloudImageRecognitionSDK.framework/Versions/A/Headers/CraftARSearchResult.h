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
#import "CraftARItem.h"
#import "CraftARImage.h"

@interface BoundingBox : NSObject

@property (nonatomic, readonly) float topLeftX;
@property (nonatomic, readonly) float topLeftY;
@property (nonatomic, readonly) float topRightX;
@property (nonatomic, readonly) float topRightY;
@property (nonatomic, readonly) float bottomLeftX;
@property (nonatomic, readonly) float bottomLeftY;
@property (nonatomic, readonly) float bottomRightX;
@property (nonatomic, readonly) float bottomRightY;

- (NSString*) description;

@end

/**
 * A CraftARSearchResult holds the information about an item found in a
 * visual search query: the item, the image matched, the score and the 
 * bounding box in the query image for the matched image.
 */
@interface CraftARSearchResult : NSObject

/**
 * CraftARItem matched for this result.
 */
@property (nonatomic, readonly) CraftARItem* item;

/**
 * CraftARImage matched for the query.
 */
@property (nonatomic, readonly) CraftARImage* matchedImage;

/**
 * Recognition score for the matched image
 * @see http://support.catchoom.com/customer/portal/articles/1785957-filter-results-of-image-recognition-based-on-score
 */
@property (nonatomic, readonly) float score;

/**
 * Bounding box in the query image of the reference image matched.
 * @see http://support.catchoom.com/customer/portal/articles/1886553-obtain-the-bounding-boxes-of-the-results-of-image-recognition
 */
@property (nonatomic, readonly) BoundingBox *matchBoundingBox;

@end
