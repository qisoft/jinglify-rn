//
//  InterfaceController.swift
//  watch-app Extension
//
//  Created by Innokentiy Shushpanov on 28/01/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import WatchKit
import Foundation
import WatchConnectivity

class InterfaceController: WKInterfaceController, WCSessionDelegate {
  @IBOutlet var startMatchButton: WKInterfaceButton!
  
  
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
      if (reply["isMatchStarted"] as? Bool ?? false == true) {
        self.startMatch()
      }
    }, errorHandler: nil)
  }
  
  
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    switch message["event"] as? String ?? "" {
    case "startMatch":
      self.startMatch()
    default:
      return
    }
  }
  
  func startMatch() {
    self.pushController(withName: "GameController", context: nil)
  }
  @IBAction func onStartMatchTap() {
    WCSession.default.sendMessage(["command": "startMatch"], replyHandler: { (_) in
      self.startMatch()
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
