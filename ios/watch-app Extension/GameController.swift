//
//  GameController.swift
//  watch-app Extension
//
//  Created by Innokentiy Shushpanov on 29/01/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import WatchKit
import WatchConnectivity

class GameController: WKInterfaceController, WCSessionDelegate {
  @IBOutlet var periodText: WKInterfaceLabel!
  @IBOutlet var activityRing: WKInterfaceActivityRing!
  @IBOutlet var pauseButton: WKInterfaceButton!
  @IBOutlet var endMatchButton: WKInterfaceButton!
  
  var session : WCSession?
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    if (WCSession.isSupported()){
      self.session = WCSession.default
      self.session?.delegate = self
      self.session?.activate()
    }
    // Configure interface objects here.
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    if activationState != .activated {
      return
    }
    self.session?.sendMessage(["command": "getState"], replyHandler: { (reply) in
      let isMatchStarted = reply["isMatchStarted"] as? Bool ?? false;
      if (isMatchStarted == false) {
        self.endMatch()
      } else if reply["isPaused"] as? Bool ?? false == true {
        self.pause()
      }
    }, errorHandler: nil)
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    switch message["event"] as? String ?? "" {
    case "pause":
      self.pause()
    case "endMatch":
      self.endMatch()
    default:
      return
    }
  }
  
  func pause() {
    self.pushController(withName: "PauseController", context: nil)
  }
  
  func endMatch() {
    self.pop()
  }
  
  @IBAction func onEndMatchTap() {
    if self.session?.activationState != .activated {
      return
    }
    
    self.session?.sendMessage(["command": "endMatch"], replyHandler: { (reply) in
      if reply["success"] as? Bool ?? false == true {
        self.endMatch()
      }
    }, errorHandler: nil)
  }
  @IBAction func onPauseTap() {
    if self.session?.activationState != .activated {
      return
    }
    
    self.session?.sendMessage(["command": "pause"], replyHandler: { (reply) in
      if reply["success"] as? Bool ?? false == true {
        self.pause()
      }
    }, errorHandler: nil)
  }
  override func willActivate() {
    // This method is called when watch view controller is about to be visible to user
    super.willActivate()
  }
  
  override func didDeactivate() {
    // This method is called when watch view controller is no longer visible
    super.didDeactivate()
  }
  
}
