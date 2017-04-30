import React from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Actions as NavigationActions } from 'react-native-router-flux'

import Game from '../Services/GameService'
import { Colors } from '../Themes'
import styles from './Styles/GameScreenStyles.js'

class GameScreen extends React.Component {
  static get defaultProps () {
    return {
      currentPeriod: 1,
      matchTime: 300,
      timeLeft: 100,
      status: 'Get started'
    }
  }

  endGame () {
    Alert.alert('End match', 'Do you want to end the match?', [
      { text: 'Yes', onPress: () => { NavigationActions.pop() }, style: 'destructive' },
      { text: 'No', onPress: () => { } }
    ])
  }

  componentDidMount () {
    this.game = new Game(this.props.dispatch, this.props.state);
    this.game.startGame(() => {
      NavigationActions.pop()
    })
  }

  render () {
    let minutesLeft = Math.floor(this.props.timeLeft / 60)
    let secondsLeft = this.props.timeLeft % 60
    return <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.titleText}>Period #{this.props.currentPeriod}</Text>
            <TouchableOpacity onPress={() => this.endGame()}>
                <Text style={styles.buttonRed}>End match</Text>
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.gameContainer}>
          <View style={styles.circleContainer}>
            <AnimatedCircularProgress
              rotation={0}
              style={styles.circleProgress}
              tintColor={Colors.brand}
              backgroundColor={Colors.greyBg}
              size="310"
              width="10"
              fill={45}/>

            <TouchableOpacity style={styles.circle}>
              <Text style={styles.timer}>{minutesLeft}:{secondsLeft}</Text>
              <Text style={styles.tapToPause}>Tap to pause</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{this.props.status}</Text>
        </View>
      </View>
    </View>
  }
}

const mapStateToProps = (state) => ({
  state: state,
  currentPeriod: state.game.currentPeriod,
  matchTime: state.game.totalMatchTime,
  timeLeft: state.game.matchTimeLeft,
  status: state.game.status
})

export default connect(mapStateToProps)(GameScreen)
