//
//  MLRNEvent.m
//  MLRN
//
//  Created by Nick Italiano on 8/25/17.
//  Copyright © 2017 Mapbox Inc. All rights reserved.
//

#import "MLRNEvent.h"

@implementation MLRNEvent

- (instancetype)init
{
    if (self = [super init]) {
        _timestamp = [[NSDate date] timeIntervalSince1970];
    }
    return self;
}

- (NSDictionary*)payload
{
    if (_payload == nil) {
        return @{};
    }
    return _payload;
}

- (NSDictionary*)toJSON
{
    return @{ @"type": self.type, @"payload": self.payload };
}

+ (MLRNEvent*)makeEvent:(NSString*)type
{
    return [MLRNEvent makeEvent:type withPayload:@{}];
}

+ (MLRNEvent*)makeEvent:(NSString*)type withPayload:(NSDictionary*)payload
{
    MLRNEvent *event = [[MLRNEvent alloc] init];
    event.type = type;
    event.payload = payload;
    return event;
}

@end
