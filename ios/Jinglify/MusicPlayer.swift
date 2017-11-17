//
//  AvMusicPlayer.swift
//  jinglify
//
//  Created by Ilya Sedov on 25/03/2017.
//  Copyright © 2017 Innokentiy Shushpanov. All rights reserved.
//

import UIKit
import MediaPlayer
import AVFoundation

class MusicPlayer: JinglePlayer {
  private let player = MPMusicPlayerController.applicationMusicPlayer()
  private var fadingCurveIdx = 0
  private var volumeView : MPVolumeView?
  
  
  func setJingle(song: MPMediaItem) {
    player.setQueue(with: MPMediaItemCollection(items: [song]))
    player.prepareToPlay()
  }
  
  func play() {
    if (isFading) {
      setupFadingTimer()
    }
    player.play()
  }
  
  func pause() {
    if (isFading) {
      playerTimer?.invalidate()
    }
    player.pause()
  }
  
  func stop() {
    player.pause()
    player.currentPlaybackTime = 0
    playerTimer?.invalidate()
    self.isFading = false
  }
  
  var isFading = false
  
  func fadeOutAndStop() {
    self.initialVolume = self.player.value(forKey: "volume") as! Float
    self.volumeView = MPVolumeView(frame: CGRect.zero)
    UIApplication.shared.keyWindow?.addSubview(volumeView!)
    self.fadingCurveIdx = 0
    self.isFading = true
    self.setupFadingTimer()
  }
  
  //MARK: - Fading helpers
  private var initialVolume : Float = 1.0;
  private let volumeCurve : [Float] = [
    1.0,
    0.8,
    0.6,
    0.4,
    0.2,
    0.1,
    0.08,
    0.06,
    0.04,
    0.02,
    0.01,
    0.008,
    0.006,
    0.004,
    0.002,
    0.001,
    0.0006,
    0.0003,
    0
  ]
  
  private var playerTimer: Timer?
  private func setupFadingTimer(){
    playerTimer?.invalidate()
    
    DispatchQueue.main.async(execute: {
      self.playerTimer = Timer.scheduledTimer(timeInterval: 0.3, target: self, selector: #selector(self.updateTime), userInfo: nil, repeats: true)
    })
  }
  
  @objc func updateTime(){
    if fadingCurveIdx > self.volumeCurve.count {
      self.playerTimer?.invalidate()
      return
    }
    let volume = self.volumeCurve[fadingCurveIdx]
    fadingCurveIdx += 1
    self.setVolume(to: volume)
    if(volume == 0){
      self.stop()
      self.setVolume(to: 1.0)
      self.playerTimer = nil
      Timer.scheduledTimer(withTimeInterval: 1.0, repeats: false, block: { (_) in
        self.volumeView?.removeFromSuperview()
        self.volumeView = nil
      })
    }
  }
  
  private func setVolume(to value: Float){
    if let slider = self.volumeView?.subviews.filter({ (v) -> Bool in
      v is UISlider
    }).first as? UISlider {
      slider.value = value * self.initialVolume
    }
    print("new volume is \(value)")
  }
  
}
