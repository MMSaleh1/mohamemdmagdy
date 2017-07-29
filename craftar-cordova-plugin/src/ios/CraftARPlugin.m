//
//  CraftARPlugin.m
//
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

#import "CraftARPlugin.h"
#import <Cordova/CDVPluginResult.h>
#import <Cordova/CDVViewController.h>

#import <CraftARCloudImageRecognitionSDK/CraftARSDK.h>
#import <CraftARCloudImageRecognitionSDK/CraftARCloudRecognition.h>
#import <CraftARCloudImageRecognitionSDK/CRSConnect.h>
#import "SerializerUtils.h"

#define CRSC_KEY @"CRSEARCHCONTROLLER"

@interface CraftARPlugin () <CraftARSDKProtocol, SearchProtocol, CameraEventsProtocol> {
    CraftARSDK *_sdk;
    CraftARCloudRecognition *_cloudRecognition;
    CRSConnect *_crs;
    
    UIView *previewView;
    UIColor *webViewColor;

    NSString* searchProtocolId;
    NSString* sdkProtocolId;
    NSString* sdkCameraId;
    NSMutableDictionary *objectInstances;
    NSMutableDictionary *callbacksIds;
    
    id <CameraEventsProtocol> camdelegate;
}
@end

@implementation CraftARPlugin

#pragma mark -
#pragma mark Cordova Plugin

- (void) pluginInitialize {
    
    previewView = [[UIView alloc] initWithFrame:self.viewController.view.frame];
    previewView.hidden = YES;
    previewView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;

    [self.viewController.view insertSubview:previewView belowSubview:self.webView];

    searchProtocolId = nil;
    sdkProtocolId = nil;
    
    _sdk = [CraftARSDK sharedCraftARSDK];
    _sdk.delegate = self;
    
    _cloudRecognition = [CraftARCloudRecognition sharedCloudImageRecognition];
    _cloudRecognition.delegate = self;
    
    _crs = [CRSConnect sharedCRSConnect];
    
    objectInstances = [[NSMutableDictionary alloc] init];
    callbacksIds = [[NSMutableDictionary alloc] init];
    
    [objectInstances setObject:_cloudRecognition.mSearchController forKey:CRSC_KEY];
    
}

- (void) onReset {
    if([[_sdk getCamera] isCapturing]) {
        [self stopCapture:nil];
    }
}

#pragma mark Plugin Helpers

- (void) forceRedrawInWebView:(UIView*)webView {
    NSArray *views = webView.scrollView.subviews;
    
    for(int i = 0; i<views.count; i++){
        UIView *view = views[i];
        
        [view setNeedsDisplay];
        [view setNeedsLayout];
      
    }
}

- (void) sentError:(NSString*) callbackId {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentError:(NSString*) callbackId withArray:(NSArray *)array{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:array];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentError:(NSString*) callbackId withData:(NSDictionary *)data{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:data];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentSuccess:(NSString*) callbackId {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentSuccess:(NSString*) callbackId  withArray:(NSArray *)array{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentSuccess:(NSString*) callbackId  withData:(NSDictionary *)data{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentEvent:(NSString*) callbackId withResult:(CDVPluginResult*) pluginResult{
    [pluginResult setKeepCallback:[NSNumber numberWithBool:YES]];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:callbackId];
}

- (void) sentEventError:(NSString*) callbackId {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    [self sentEvent:callbackId withResult:pluginResult];
}

- (void) sentEventError:(NSString*) callbackId withArray:(NSArray *)array{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsArray:array];
    [self sentEvent:callbackId withResult:pluginResult];
}

- (void) sentEventError:(NSString*) callbackId withData:(NSDictionary *)data{
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsDictionary:data];
    [self sentEvent:callbackId withResult:pluginResult];
}

- (void) sentEventSuccess:(NSString*) callbackId {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self sentEvent:callbackId withResult:pluginResult];
}

- (void) sentEventSuccess:(NSString*) callbackId withArray:(NSArray *)array {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsArray:array];
    [self sentEvent:callbackId withResult:pluginResult];
}

- (void) sentEventSuccess:(NSString*) callbackId withData:(NSDictionary *)data {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:data];
    [self sentEvent:callbackId withResult:pluginResult];
}

- (void) sentEventError:(NSString*) callbackId withObject:(NSObject *)obj andEvent:(NSString *) event{
    NSDictionary *response = [self sentEventResponse:event withResponse:obj];
    [self sentEventError:callbackId withData:response];
}

- (void) sentEventSuccess:(NSString*) callbackId withObject:(NSObject *)obj andEvent:(NSString *) event{
    NSDictionary *response = [self sentEventResponse:event withResponse:obj];
    [self sentEventSuccess:callbackId withData:response];
}

- (NSDictionary *) sentEventResponse: (NSString *)event withResponse: (NSObject *) response {
    
    NSDictionary *eventResponse;
    if(response) {
        eventResponse = @{@"event":event,
                        @"result":response};
    } else {
        eventResponse = @{@"event":event};
    }
    return eventResponse;
}

#pragma mark -
#pragma mark ViewController
- (void) startView:(CDVInvokedUrlCommand*)command{
    NSLog(@"CraftAR plugin - StartView");

    if ([command.arguments count] != 1){
       [self sentError:command.callbackId];
       return;
    }

    CDVViewController *_cwv = [CDVViewController new];
    
    NSDictionary *dict =[command.arguments objectAtIndex:0];
    
    _cwv.startPage = (NSString *) [dict objectForKey:@"loadUrl"];
    
    [self onReset];
    
    
    [self.viewController presentViewController:_cwv
                                      animated:YES
                                    completion:^{
                                        [self sentSuccess:command.callbackId];
                                    }];
}

- (void) closeView:(CDVInvokedUrlCommand*)command{
    [self.viewController dismissViewControllerAnimated:YES completion:nil];
}

#pragma mark -
#pragma mark CraftARSDK

- (void) setSearchController:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    
    _sdk.searchControllerDelegate = [objectInstances objectForKey:[command.arguments objectAtIndex:0]];
    searchProtocolId = [callbacksIds objectForKey:[command.arguments objectAtIndex:0]];
}

- (void) startCapture:(CDVInvokedUrlCommand*)command {
    [_sdk startCaptureWithView:previewView];
    webViewColor = self.webView.backgroundColor;
    self.webView.backgroundColor = [UIColor clearColor];
    self.webView.opaque = NO;
    previewView.hidden = NO;
    [self forceRedrawInWebView:self.webView];
}


- (void) stopCapture:(CDVInvokedUrlCommand*)command {
    [_sdk stopCapture];
    previewView.hidden = YES;
    self.webView.opaque = YES;
    self.webView.backgroundColor = webViewColor;
    [self forceRedrawInWebView:self.webView];
}

- (void) singleShotSearch:(CDVInvokedUrlCommand*)command {
    [_sdk singleShotSearch];
}

- (void) startFinder:(CDVInvokedUrlCommand*)command {
    [_sdk startFinder];
}

- (void) startFinderWithTimeout:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    NSTimeInterval timeoutSeconds = [[command argumentAtIndex:0 withDefault:0] doubleValue];
    [_sdk startFinderWithTimeout:timeoutSeconds];
}

- (void) stopFinder:(CDVInvokedUrlCommand*)command {
    [_sdk stopFinder];
}

/*- (void) isFinding:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsBool:_sdk.isFinding];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}*/





#pragma mark -
#pragma mark CraftARCloudRecognition

- (void) setRequestBoundingBoxes:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    _cloudRecognition.retrieveBoundingBox = [[command.arguments objectAtIndex:0] boolValue];
}

- (void) setEmbedCustom:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    _cloudRecognition.embedCustomField = [[command.arguments objectAtIndex:0] boolValue];

}

- (void) setCollectionWithToken:(CDVInvokedUrlCommand*)command {
    NSString* token = [command argumentAtIndex:0 withDefault:nil];
    __weak __typeof__(self) weakSelf = self;
    [_cloudRecognition setCollectionWithToken:token onSuccess:^{
        [weakSelf sentSuccess:command.callbackId];
    } andOnError:^(NSError *error) {
        [weakSelf sentError:command.callbackId withData:error.encode];
    }];
    
}


- (void) searchWithImage:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    
    CraftARQueryImage *image = [[CraftARQueryImage alloc] decode:[command.arguments objectAtIndex:0]];
    
    __weak __typeof__(self) weakSelf = self;
    [_cloudRecognition searchWithImage:image withOnResults:^(NSArray *results) {
        [weakSelf sentSuccess:command.callbackId withArray:results.encode];
    } andOnError:^(NSError *error) {
        [weakSelf sentError:command.callbackId withData:error.encode];
    }];
}


- (void) setSearchPeriod:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    [_cloudRecognition.mSearchController setMaxSearchesPerSecond: 1000.0/(float)[[command.arguments objectAtIndex:0] intValue]];

}

#pragma mark -
#pragma mark CraftARCamera

- (void) pauseCapture:(CDVInvokedUrlCommand*)command {
    [[_sdk getCamera] pauseCapture];
}

- (void) restartCapture:(CDVInvokedUrlCommand*)command {
    [[_sdk getCamera] restartCapture];
}

- (void) takePicture:(CDVInvokedUrlCommand*)command {
    camdelegate = [_sdk getCamera].delegate;
    sdkCameraId = command.callbackId;
    [[_sdk getCamera] performSelector:@selector(takePicture)];
}

- (void) triggerFocus:(CDVInvokedUrlCommand*)command {
    CGPoint pointOfinterest = CGPointMake(0.5, 0.5);
    [[_sdk getCamera] runConfigurationBlock:^(AVCaptureDevice *camera) {
        if ([camera isFocusModeSupported:AVCaptureFocusModeAutoFocus]) {
            [camera setFocusPointOfInterest:pointOfinterest];
            [camera setFocusMode:AVCaptureFocusModeAutoFocus];
        }
    }];
}

//CameraEventsProtocol
- (void) didTakePicture: (UIImage*) image {
    [_sdk getCamera].delegate = camdelegate;
    CraftARQueryImage *query = [[CraftARQueryImage alloc] initWithUIImage:image];
    [self sentSuccess:sdkCameraId withData:query.encode];
}

- (void) didReceivePreviewFrame: (VideoFrame*) image {
}


#pragma mark -
#pragma mark CraftARSDKProtocol
- (void) craftARSDKProtocol:(CDVInvokedUrlCommand*)command {
    sdkProtocolId = command.callbackId;    
}

- (void) didStartCapture {
    if(sdkProtocolId != nil) {
        [self sentEventSuccess:sdkProtocolId];
    }
}

- (void) didGetFinderTimeout{
    if(sdkProtocolId != nil) {
       [self sentEventError:sdkProtocolId];
    }
}

#pragma mark -
#pragma mark SearchProtocol
- (void) searchProtocol:(CDVInvokedUrlCommand*)command {
    [callbacksIds setObject:command.callbackId forKey:CRSC_KEY];
}

- (void) didGetSearchResults: (NSArray*) results {
    if(searchProtocolId != nil) {
        if([_sdk isFinding] && results.count > 0) {
            [_sdk stopFinder];
        }
        [self sentEventSuccess:searchProtocolId withArray:results.encode];
    }
}

- (void) didFailSearchWithError: (NSError*) error {
    if(searchProtocolId != nil) {
        [self sentEventError:searchProtocolId withData:error.encode];
    }
}

#pragma mark -
#pragma mark CRSConnect

- (void) setConnectURL:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    [_crs setConnectURL:[command.arguments objectAtIndex:0]];
}
- (void) setSearchURL:(CDVInvokedUrlCommand*)command {
    if ([command.arguments count] != 1){
        [self sentError:command.callbackId];
        return;
    }
    [_crs setSearchURL:[command.arguments objectAtIndex:0]];
}

#pragma mark -

@end
