//
//  Event.swift
//  watch-app Extension
//
//  Created by Innokentiy Shushpanov on 26/03/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
enum Event {
  case unknown
  case resume
  case throwAPuck
  case startMatch
  case endMatch
  case pause
  case timeUpdated(timeLeft: Int, timeTotal: Int)
}
