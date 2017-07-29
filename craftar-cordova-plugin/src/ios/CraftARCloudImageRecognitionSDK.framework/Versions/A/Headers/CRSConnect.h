// This file is free software. You may use it under the MIT license, which is copied
// below and available at http://opensource.org/licenses/MIT
//
// Copyright (c) 2014 Catchoom Technologies S.L.
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
 * The CRSConnect class is used by the SDK to connect to
 * the CRS. It just manages the network connection and requests and forwards the
 * responses to the SDK to be processed. This class behaviour may be overriden in 
 * order to place a proxy between the CRS API and the SDK.
 */
@interface CRSConnect : NSObject

/// Returns the singleton instance of this class. @note used internally
+ (CRSConnect *)sharedCRSConnect;

/// Used internally to obtain the url of the server for cloud recognition. @note override to connect to a different server (use a proxy server)
+ (NSString*) getCloudRecognitionUrl;


- (void) setConnectURL: (NSString*) url;
- (void) setSearchURL: (NSString*) url;

/**
 Creates a connection with the server using the set token. With this call, you are authenticating the
 application against the CraftAR service and connecting the app to a specific collection.
 @param collectionToken CraftAR collection token.
 @param responseBlock called when a response from the server is obtained
 @param onError called when an error is produced to perform the call (eg. there's no internet connection).
 @see CraftARSearchProtocol
 @see http://catchoom.com/documentation/token
 @note used to validate the collection token
 @note If you override this method, take into account how the catchooom CRS API works: http://catchoom.com/documentation/api/recognition/ (timestamp).
 */
- (void)connectForCollection: (NSString*) collectionToken withOnResponse: (void(^)(id response, int statusCode)) responseBlock andOnError: (void(^)(NSError* error)) errorBlock;

/**
 Performs a search call for an image data.
 @param params dictionary containing options for the CRS: <ul>
    <li> bbox: NSString (true/false) (return bounding boxes, "false" by default) </li>
    <li>  embed_tracking_data: NSString (true/false/app_id) (embed tracking data file in response, "false" by default) </li>
    <li>  embed_custom_data: NSString (true/false) (embed custom data in resposnse, "false" by default) </li>
 </ul>
 @param responseBlock called when a response from the server is obtained
 @param onError called when an error is produced to perform the call (eg. there's no internet connection).
 @note If you override this method, take into account how the catchooom CRS API works: http://catchoom.com/documentation/api/recognition/
 */
- (void)searchWithData:(NSData *)imageNSData andParams: (NSDictionary*) params forCollection: (NSString*) collectionToken withOnResponse: (void(^)(id response, int statusCode)) responseBlock andOnError: (void(^)(NSError* error)) errorBlock;

@end
