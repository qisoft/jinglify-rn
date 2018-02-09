import React, { Component } from 'react'
import { Scene, Stack, Router } from 'react-native-router-flux'

// screens identified by the router
import GetStartedScreen from '../screens/getStartedScreen/containers/GetStartedScreen'
import SongsScreen from '../screens/songsScreen/containers/SongsScreen'
import GameScreen from '../screens/gameScreen/containers/GameScreen'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Stack key="root">
          <Scene initial key='getStarted' component={GetStartedScreen} title='Get Started' hideNavBar />
          <Scene key='songs' component={SongsScreen} title='Songs' hideNavBar />
          <Scene key='game' component={GameScreen} title='Game' hideNavBar />
        </Stack>
      </Router>
    )
  }
}

export default NavigationRouter
