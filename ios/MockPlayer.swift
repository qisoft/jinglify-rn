//
//  MockPlayer.swift
//  Jinglify
//
//  Created by Innokentiy Shushpanov on 02/05/2017.
//  Copyright © 2017 Facebook. All rights reserved.
//

import Foundation
import MediaPlayer
import AVKit

class MockPlayer : JinglePlayer {
  var player : AVAudioPlayer?
  
  init(){
    isFading = false
    player = self.getAudioPlayer(forFile: "russian-anthem", withExtension: "mp3")
  }
  
  private func getAudioPlayer(forFile : String, withExtension : String) -> AVAudioPlayer?{
    if let url = Bundle.main.url(forResource: forFile, withExtension: withExtension){
      do {
        return try AVAudioPlayer(contentsOf: url)
      } catch { }
    }
    return nil
  }
  
  func pause() {
    player?.pause()
  }
  func play() {
    player?.play()
  }
  func setJingle(song: MPMediaItem) {
    
  }
  func stop() {
    player?.stop()
  }
  func fadeOutAndStop() {
    DispatchQueue.main.async(execute: {
      Timer.scheduledTimer(withTimeInterval: 5, repeats: false) { _ in
        self.player?.stop()
        self.player?.currentTime = 0
      }
    })
  }
  
  var isFading: Bool
}
