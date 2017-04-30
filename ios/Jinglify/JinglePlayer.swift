//
//  JinglePlayer.swift
//  jinglify
//
//  Created by Ilya Sedov on 25/03/2017.
//  Copyright © 2017 Innokentiy Shushpanov. All rights reserved.
//

import Foundation
import MediaPlayer

protocol JinglePlayer {
  func setJingle(song: MPMediaItem)
  
  func play()
  
  func pause()
  
  func stop()
  
  func fadeOutAndStop()
  
  var isFading: Bool { get }
}
