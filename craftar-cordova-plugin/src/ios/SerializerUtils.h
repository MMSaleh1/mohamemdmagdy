//
//  SerializerUtils.h
//
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

#import <Foundation/Foundation.h>
#import <CraftARCloudImageRecognitionSDK/CraftARCloudRecognition.h>

@protocol SerializerProtocol <NSObject>
 - (NSDictionary *) encode;
 - (id) decode: (NSDictionary*) obj;
@end

@interface CraftARItem (Serialization) <SerializerProtocol>
@end

@interface CraftARSearchResult (Serialization) <SerializerProtocol>
@end

@interface CraftARQueryImage (Serialization) <SerializerProtocol>
@end

@interface NSError (Serialization) <SerializerProtocol>
@end

@interface NSArray (Serialization)
- (NSArray *) encode;
@end

@interface NSObject (Serialization)
+ (id) objectOrNull:(id) object;
@end
