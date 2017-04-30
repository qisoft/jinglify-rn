//
//  AudioPlayerBridge.m
//  Jinglify
//
//  Created by Innokentiy Shushpanov on 28/04/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AudioPlayer, NSObject)

RCT_EXTERN_METHOD(vibrate)
RCT_EXTERN_METHOD(changeSong:(NSString*)songTitle artistTitle:(NSString*)artistTitle)
RCT_EXTERN_METHOD(getTracks:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(pauseJingle)
RCT_EXTERN_METHOD(playJingle)
RCT_EXTERN_METHOD(longBeep)
RCT_EXTERN_METHOD(throwingGoalBeep)
RCT_EXTERN_METHOD(beep:(nonnull NSNumber*)times)
RCT_EXTERN_METHOD(stopPlayers)
RCT_EXTERN_METHOD(fadeOutAndStopPlayer)

@end
