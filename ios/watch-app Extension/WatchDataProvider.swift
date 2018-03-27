//
//  WatchDataProvider.swift
//  watch-app Extension
//
//  Created by Innokentiy Shushpanov on 11/03/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import WatchConnectivity

protocol WatchDataProviderDelegate {
  func eventReceived(event: Event)
  func onActivated()
}

class WatchDataProvider:NSObject, WCSessionDelegate {
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    WatchDataProvider.activated = true
    for delegate in delegates {
      delegate.onActivated()
    }
  }


  // This class is singleton
  static let sharedInstance = WatchDataProvider()
  static var activated = false

  // Sub-Delegates we'll forward to
  var delegates = [WatchDataProviderDelegate]()

  override init() {
    super.init()
    if WCSession.isSupported() {
      WCSession.default.delegate = self
      WCSession.default.activate()
    }
  }

  public func getState(replyHandler: (([String : Any]) -> Void)? = nil) {
    self.sendCommand("getState") { (reply) in
      replyHandler?(reply)
    }
  }

  public func sendCommand(_ name: String, replyHandler: (([String : Any]) -> Void)? = nil) {
    if WCSession.default.activationState != .activated {
      return
    }
    WCSession.default.sendMessage(["command": name], replyHandler: { (reply) in
      replyHandler?(reply)
    }, errorHandler: nil)
  }

  // MARK: - WCSessionDelegate

  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    processIncomingMessage(message)
  }
  func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
    processIncomingMessage(message)
    replyHandler(["success": true ])
  }

  func processIncomingMessage(_ message: [String:Any] ) {
    let event = getEvent(message: message)
    notifyDelegates(event: event)

  }

  func getEvent(message: [String:Any]) -> Event {
    let eventName = message["event"] as? String ?? ""
    switch eventName {
    case "pause":
      return .pause
    case "startMatch":
      return .startMatch
    case "throw":
      return .throwAPuck
    case "endMatch":
      return .endMatch
    case "resume":
      return .resume
    case "timeUpdated":
      let timeLeft = message["timeLeft"] as? Int ?? 0
      let timeTotal = message["timeTotal"] as? Int ?? 0
      return .timeUpdated(timeLeft: timeLeft, timeTotal: timeTotal)
    default:
      return .unknown
    }
  }

  // MARK: - QLWatchDataProviderDelegate

  public func addDelegate(_ delegate: WatchDataProviderDelegate) {
    if !(delegates as NSArray).contains(delegate) {
      delegates.append(delegate)
      if WatchDataProvider.activated {
        delegate.onActivated()
      }
    }
  }

  public func removeDelegate(_ delegate: WatchDataProviderDelegate) {
    if (delegates as NSArray).contains(delegate) {
      delegates.remove(at: (delegates as NSArray).index(of: delegate))
    }
  }

  func notifyDelegates(event: Event)
  {
    for delegate in delegates {
      delegate.eventReceived(event: event)
    }
  }
}
