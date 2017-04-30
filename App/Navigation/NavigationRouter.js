import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'

// screens identified by the router
import GetStartedScreen from '../Containers/GetStartedScreen'
import SongsScreen from '../Containers/SongsScreen'
import GameScreen from '../Containers/GameScreen'
/* **************************
* Documentation: https://github.com/aksonov/react-native-router-flux
***************************/

class NavigationRouter extends Component {
  render () {
    return (
      <Router>
        <Scene initial key='getStarted' component={GetStartedScreen} title='Get Started' hideNavBar />
        <Scene direction='vertical' key='songs' component={SongsScreen} title="Songs" hideNavBar/>
        <Scene key='game' component={GameScreen} title="Game" hideNavBar />
      </Router>
    )
  }
}

export default NavigationRouter
