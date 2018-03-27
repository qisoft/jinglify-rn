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

class GameController: WKInterfaceController, WatchDataProviderDelegate{
  func eventReceived(event: Event) {
    switch event {
    case .pause:
      self.pause()
    case .endMatch:
      self.endMatch()
    case .timeUpdated(let timeLeft, let timeTotal):
      self.timeUpdated(timeLeft: timeLeft, timeTotal: timeTotal)
    default:
      return
    }
  }

  func onActivated() {
    WatchDataProvider.sharedInstance.getState { (reply) in
      let isMatchStarted = reply["isMatchStarted"] as? Bool ?? false;
      if (isMatchStarted == false) {
        self.endMatch()
      } else if reply["isPaused"] as? Bool ?? false == true {
        self.pause()
      }
    }
  }

  override func didAppear() {
    super.didAppear()
    WatchDataProvider.sharedInstance.addDelegate(self)
  }
  override func willDisappear() {
    super.willDisappear()
    WatchDataProvider.sharedInstance.removeDelegate(self)
  }


  @IBOutlet var periodText: WKInterfaceLabel!
  @IBOutlet var pauseButton: WKInterfaceButton!
  @IBOutlet var endMatchButton: WKInterfaceButton!
  @IBOutlet var timerLabel: WKInterfaceLabel!

  override func awake(withContext context: Any?) {
    super.awake(withContext: context)
    // Configure interface objects here.
  }


  func pause() {
    self.pushController(withName: "PauseController", context: nil)
  }

  func endMatch() {
    self.pop()
  }

  func timeUpdated(timeLeft: Int, timeTotal: Int) {
    let minutesLeft = timeLeft / 60
    let secondsLeft = timeLeft % 60
    if secondsLeft == 0 {
      WKInterfaceDevice.current().play(.notification)
    }
    timerLabel.setText(timeLeft > timeTotal ? "--:--" : String(format:"%02i:%02i", minutesLeft, secondsLeft))
  }

  @IBAction func onEndMatchTap() {
    WatchDataProvider.sharedInstance.sendCommand("endMatch")
  }
  @IBAction func onPauseTap() {

    WatchDataProvider.sharedInstance.sendCommand("pause")
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
