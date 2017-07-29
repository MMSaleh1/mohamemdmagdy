//
//  CraftARPlugin.h
//
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

#import <Foundation/Foundation.h>
#import <Cordova/CDVPlugin.h>

@interface CraftARPlugin : CDVPlugin

//Plugin
- (void) pluginInitialize;
- (void) onReset;

//ViewController
- (void) startView:(CDVInvokedUrlCommand*)command;
- (void) closeView:(CDVInvokedUrlCommand*)command;

//CraftARSDK
- (void) startCapture:(CDVInvokedUrlCommand*)command;
- (void) stopCapture:(CDVInvokedUrlCommand*)command;
- (void) singleShotSearch:(CDVInvokedUrlCommand*)command;
- (void) startFinder:(CDVInvokedUrlCommand*)command;
- (void) startFinderWithTimeout:(CDVInvokedUrlCommand*)command;
- (void) stopFinder:(CDVInvokedUrlCommand*)command;
//- (void) isFinding:(CDVInvokedUrlCommand*)command;
- (void) setSearchController:(CDVInvokedUrlCommand*)command;

//CraftARCloudRecognition
- (void) setRequestBoundingBoxes:(CDVInvokedUrlCommand*)command;
- (void) setEmbedCustom:(CDVInvokedUrlCommand*)command;
- (void) setCollectionWithToken:(CDVInvokedUrlCommand*)command;
- (void) searchWithImage:(CDVInvokedUrlCommand*)command;

//CraftARCamera
- (void) pauseCapture:(CDVInvokedUrlCommand*)command;
- (void) restartCapture:(CDVInvokedUrlCommand*)command;
//- (BOOL) isCapturing; //TODO: Not implement
- (void) triggerFocus:(CDVInvokedUrlCommand*)command;
- (void) takePicture:(CDVInvokedUrlCommand*)command;

//CraftARSDKProtocol
- (void) craftARSDKProtocol:(CDVInvokedUrlCommand*)command;
- (void) didStartCapture;
- (void) didGetFinderTimeout;

//SearchProtocol
- (void) searchProtocol:(CDVInvokedUrlCommand*)command;
- (void) didGetSearchResults: (NSArray*) results;
- (void) didFailSearchWithError: (NSError*) error;

//CRSConnect
- (void) setConnectURL:(CDVInvokedUrlCommand*)command;
- (void) setSearchURL:(CDVInvokedUrlCommand*)command;

@end
