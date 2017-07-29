//
//  SerializerUtils.m
//
//  Created by Toni Quesada on 2016.
//  Infinity Source S.L.
//

#import "SerializerUtils.h"


@implementation CraftARItem (Serialization)
- (NSDictionary *) encode {
    bool isAR = false;
    return @{@"name":[NSObject objectOrNull:self.name],
             @"url":[NSObject objectOrNull:self.url],
             @"uuid":[NSObject objectOrNull:self.uuid],
             @"custom":[NSObject objectOrNull:self.custom],
             @"isAR":[NSNumber numberWithBool:isAR]};
}

- (id) decode: (NSDictionary*) obj {
    return self;
}

@end

@implementation CraftARSearchResult (Serialization)

- (NSDictionary *) encode {

    return @{@"score":[NSNumber numberWithFloat:self.score],
             @"item": self.item?[self.item encode]:[NSNull null],
             @"matchedImage":self.matchedImage?@{ @"uuid":[NSObject objectOrNull:self.matchedImage.uuid],
                                @"thumbnail320Url": [NSObject objectOrNull:self.matchedImage.thumbnail320Url],
                                @"thumbnail120Url": [NSObject objectOrNull:self.matchedImage.thumbnail120Url],
                                @"thumbnail60Url": [NSObject objectOrNull:self.matchedImage.thumbnail60Url]}
                                :[NSNull null]
             };
    
}

- (id) decode: (NSDictionary*) obj {
    return self;
}


@end

@implementation CraftARQueryImage (Serializarion)
- (NSDictionary *) encode {
    return @{@"image":[NSString stringWithFormat:@"data:image/png;base64,%@",[UIImagePNGRepresentation([self getUIImage]) base64EncodedStringWithOptions:0]]};
    
}

- (id) decode: (NSDictionary*) obj {
    NSString* image = [obj objectForKey:@"image"];
    NSArray* arr = [image componentsSeparatedByString:@","];
    if(arr.count !=2)
        return nil;
    NSData *decodedData = [[NSData alloc] initWithBase64EncodedString:arr[1] options:0];
    return [self initWithUIImage: [UIImage imageWithData:decodedData]];
}
@end

@implementation NSError (Serialization)

- (NSDictionary *) encode {
    return @{@"errorCode":[NSNumber numberWithLong:self.code],@"errorMessage":[NSObject objectOrNull:self.localizedDescription]};
}

- (id) decode: (NSDictionary*) obj {
    return self;
}

@end

@implementation NSArray (Serialization)

- (NSArray *) encode {
    NSMutableArray *array = [[NSMutableArray alloc] init];
    for(id <SerializerProtocol> result in self)
    {
        [array addObject:result.encode];
    }
    return array;
}

@end

@implementation NSObject (Serialization)

+ (id) objectOrNull:(id) object {
    return object?: [NSNull null];
}
   
@end
