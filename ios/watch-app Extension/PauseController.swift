//
//  PauseController.swift
//  watch-app Extension
//
//  Created by Innokentiy Shushpanov on 29/01/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import WatchKit
import Foundation
import WatchConnectivity

class PauseController: WKInterfaceController, WCSessionDelegate {
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
        self.pop()
      } else if reply["isPaused"] as? Bool ?? false == true {
        self.pushController(withName: "PauseController", context: nil)
      }
    }, errorHandler: nil)
  }

  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    switch message["event"] as? String ?? "" {
    case "resume", "throw":
      self.pop()
    default:
      return
    }
  }
  override func willActivate() {
    // This method is called when watch view controller is about to be visible to user
    super.willActivate()
  }
  @IBAction func onResumeTap() {
    if self.session?.activationState != .activated {
      return
    }
    
    self.session?.sendMessage(["command": "resume"], replyHandler: { (reply) in
      if reply["success"] as? Bool ?? false == true {
        self.pop()
      }
    }, errorHandler: nil)
  }
  @IBAction func onThrowTap() {
    if self.session?.activationState != .activated {
      return
    }
    
    self.session?.sendMessage(["command": "throw"], replyHandler: { (reply) in
      if reply["success"] as? Bool ?? false == true {
        self.pop()
      }
    }, errorHandler: nil)
  }
    
  override func didDeactivate() {
    // This method is called when watch view controller is no longer visible
    super.didDeactivate()
  }

}
