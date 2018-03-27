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

class InterfaceController: WKInterfaceController, WatchDataProviderDelegate {
  func eventReceived(event: Event) {
    switch event {
    case .startMatch: self.startMatch()
    default: return
    }
  }
  
  func onActivated() {
    WatchDataProvider.sharedInstance.getState { (state) in
      if (state["isMatchStarted"] as? Bool ?? false == true) {
        self.startMatch()
      }
    }
  }
  
  @IBOutlet var startMatchButton: WKInterfaceButton!
  
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
  
  
  func startMatch() {
    self.pushController(withName: "GameController", context: nil)
  }
  
  @IBAction func onStartMatchTap() {
    WatchDataProvider.sharedInstance.sendCommand("startMatch") { _ in
      //self.startMatch()
    }
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
