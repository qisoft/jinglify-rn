import '../config'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../redux'
import {subscribeToMessages} from 'react-native-watch-connectivity';

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  componentDidMount () {
    this.unsubscribe = subscribeToMessages((err, message, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      const { game } = store.getState();
      switch (message.command) {
        case 'getState': {
          if (game.currentGame === null) {
            reply({
              isMatchStarted: false,
              isPaused: false,
            });
          } else if (game.isPaused) {
            reply({
              isMatchStarted: true,
              isPaused: true,
            });
          } else {
            reply({
              isMatchStarted: true,
              isPaused: false,
            })
          }
          break;
        }
      }
    })
  }

  componentWillMount() {
    this.unsubscribe && this.unsubscribe();
  }
  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

export default App
