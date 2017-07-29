//
//  CraftARCollection.h
//  CraftARCommons
//
//  Created by Luis Martinell Andreu on 31/08/15.
//  Copyright (c) 2015 Luis Martinell Andreu. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CraftARCollection : NSObject

- (id) initWithName: (NSString*)name uuid: (NSString*) uuid imageTemplate: (NSString*) imageTemplate appId: (NSString*) appId andPubKey: (NSString*) pubkey;

@property (nonatomic, readonly) NSString *name;
@property (nonatomic, readonly) NSString *uuid;
@property (nonatomic, readonly) NSString *imageTemplate;
@property (nonatomic, readonly) NSString *appId;
@property (nonatomic, readonly) NSString *pubkey;

- (NSString*) thumbnailURLForItemUUID: (NSString*) itemUUID andImageUUID: (NSString*) imageUUID;

@end
