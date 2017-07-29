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
 * An Item represents an object in a collection in the CraftAR
 * databse.
 */
@interface CraftARItem : NSObject

/**
 * Item's uuid. This value uniquely identifies the item in the CraftAR Service
 */
@property (nonatomic, readonly) NSString* uuid;

/**
 * Item's name
 */
@property (nonatomic, readonly) NSString* name;

/**
 * Item's url. URL to the item in the CraftAR Service.
 * @see See more http://catchoom.com/documentation/management-api/
 */
@property (nonatomic, readonly) NSString* url;

/**
 * Item's custom data field.
 * @see http://support.catchoom.com/customer/portal/articles/1785968-how-can-i-get-the-metadata-associated-with-the-item-
 */
@property (nonatomic, readonly) NSString* custom;

@end
