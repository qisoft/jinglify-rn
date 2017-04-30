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

class AvMusicPlayer: JinglePlayer {
  
  private var player: AVAudioPlayer?
  
  func setJingle(song: MPMediaItem) {
    guard let songUrl = song.assetURL else {
      return
    }
    do {
      player = try AVAudioPlayer(contentsOf: songUrl)
      player?.prepareToPlay()
    } catch {
      print(error)
    }
  }
  
  func play() {
    if (isFading) {
      setupFadingTimer()
    }
    player?.play()
  }
  
  func pause() {
    if (isFading) {
      playerTimer?.invalidate()
    }
    player?.pause()
  }
  
  func stop() {
    player?.stop()
    playerTimer?.invalidate()
  }
  
  var isFading = false
  
  func fadeOutAndStop() {
    self.setupFadingTimer()
    self.isFading = true
  }
  
  //MARK: - Fading helpers
  
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
  private var fadingCurveIdx = 0
  private func setupFadingTimer(){
    playerTimer?.invalidate()
    
    fadingCurveIdx = 0
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
      self.player?.stop()
      self.player?.currentTime = 0
      self.setVolume(to: 1.0)
      self.isFading = false
      self.playerTimer?.invalidate()
      self.playerTimer = nil
    }
  }
  
  private func setVolume(to value: Float){
    player?.volume = value
    print("new volume is \(value)")
  }
  
}
