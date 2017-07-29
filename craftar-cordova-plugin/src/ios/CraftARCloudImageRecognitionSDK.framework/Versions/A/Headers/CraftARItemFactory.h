//
//  CraftARItemFactory.h
//  CraftARCommons
//
//  Created by Luis Martinell Andreu on 29/07/15.
//  Copyright (c) 2015 Luis Martinell Andreu. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CraftARItem.h"
#import "CraftARCollection.h"
#import "CraftARError.h"

/**
 *The CraftARItemFactory class creates CraftARItems of different subtypes.
 */
@interface CraftARItemFactory : NSObject

/**
 * Returns the current items factory
 */
+ (CraftARItemFactory*) factory;

/*
 * Set the factory
 */
+ (void) setFactory: (CraftARItemFactory*) factory;


/**
 * Set the Item class for the factory to create items of this class.
 * Useful for customizing items.
 * @param itemClass subclass of CarftARItem
 */
- (void) setItemClass: (Class) itemClass;

/**
 * Create an Item with the contents of a Dictionary
 * @param itemDictionary dictionary with the item description (from a JSON response of the CraftAR Recognition API or from the local database)
 * @param itemUUID uuid of the item to create, must not be nil.
 * @param collectionUUID uuid of the collection to which the item belongs, it can be nil.
 * @param error if passed, will be filled with the possible creation error. 
 * @return CraftARItem created, nil if an error occurred during item creation.
 */
- (CraftARItem*) itemWithContentsOfDictionary: (NSDictionary *) itemDictionary withUUID: (NSString*) itemUUID andCollection: (CraftARCollection*) collection andError: (CraftARError**) error;

@end
