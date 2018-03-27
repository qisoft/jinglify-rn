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

class PauseController: WKInterfaceController, WatchDataProviderDelegate {
  func eventReceived(event: Event) {
    switch event {
    case .resume, .throwAPuck:
      self.pop()
    default:
      return
    }
  }
  
  func onActivated() {
    WatchDataProvider.sharedInstance.getState { (reply) in
      let isMatchStarted = reply["isMatchStarted"] as? Bool ?? false;
      if (isMatchStarted == false) {
        self.popToRootController()
      }
    }
  }
  
  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    // Configure interface objects here.
  }
  
  
  override func didAppear() {
    super.didAppear()
    WatchDataProvider.sharedInstance.addDelegate(self)
  }
  override func willDisappear() {
    super.willDisappear()
    WatchDataProvider.sharedInstance.removeDelegate(self)
  }
  
  override func willActivate() {
    // This method is called when watch view controller is about to be visible to user
    super.willActivate()
  }
  @IBAction func onResumeTap() {
    WatchDataProvider.sharedInstance.sendCommand("resume") { (reply) in
      if reply["success"] as? Bool ?? false == true {
        self.pop()
      }
    }
  }
  @IBAction func onThrowTap() {
    WatchDataProvider.sharedInstance.sendCommand("throw") { (reply) in
      if reply["success"] as? Bool ?? false == true {
        self.pop()
      }
    }
  }
    
  override func didDeactivate() {
    // This method is called when watch view controller is no longer visible
    super.didDeactivate()
  }

}
