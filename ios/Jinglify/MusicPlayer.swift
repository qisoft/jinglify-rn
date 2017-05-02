//
//  MusicPlayer.swift
//  jinglify
//
//  Created by Ilya Sedov on 25/03/2017.
//  Copyright © 2017 Innokentiy Shushpanov. All rights reserved.
//

import UIKit
import MediaPlayer

class MusicPlayer: JinglePlayer {
  private let player = MPMusicPlayerController.applicationMusicPlayer()
  
  func setJingle(song: MPMediaItem) {
    player.setQueue(with: MPMediaItemCollection(items: [song]))
    player.prepareToPlay()
  }
  
  func play() {
    player.play()
  }
  
  func pause() {
    player.pause()
  }
  
  func stop() {
    player.stop()
  }
  
  func fadeOutAndStop() {
    DispatchQueue.main.async(execute: {
      Timer.scheduledTimer(withTimeInterval: 5, repeats: false) { _ in
        self.player.stop()
      }
    })
  }
  
  var isFading = false
}
