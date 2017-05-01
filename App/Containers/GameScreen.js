import React from 'react'
import { AppState, View, Text, TouchableOpacity, Alert, LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { BlurView } from 'react-native-blur';
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
  constructor(props) {
    super(props)
    this.state = {
      isPaused: false
    }
  }

  endGame () {
    Alert.alert('End match', 'Do you want to end the match?', [
      { text: 'Yes', onPress: () => { this.game.stopGame() }, style: 'destructive' },
      { text: 'No', onPress: () => { } }
    ])
  }

  pauseGame () {
    LayoutAnimation.spring()
    this.setState({ isPaused: true })
    this.game.pauseGame()
  }

  resumeGame() {
    LayoutAnimation.spring()
    this.setState({ isPaused: false })
    this.game.resumeGame()
  }

  throwAPuck() {
    LayoutAnimation.spring()
    this.setState({ isPaused: false })
    this.game.throwAPuck()
  }

  componentDidMount () {
    this.game = new Game(this.props.dispatch, this.props.state);
    this.game.startGame(() => {
      NavigationActions.pop()
    })
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.pauseGame()
    }
  }

  pad (number, size) {
    let s = String(number)
    while (s.length < (size || 2)) { s = '0' + s }
    return s
  }

  render () {
    let { timeLeft, matchTime, status, currentPeriod, cleanMatchTime } = this.props
    let minutesLeft = this.pad(Math.floor(timeLeft / 60))
    let secondsLeft = this.pad(this.props.timeLeft % 60)
    let progress = ((cleanMatchTime - timeLeft) / cleanMatchTime) * 100
    return <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.titleText}>Period #{currentPeriod}</Text>
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
              size={310}
              width={10}
              fill={progress}/>

            <TouchableOpacity style={styles.circle} onPress={() => this.pauseGame()}>
              <Text style={styles.timer}>
                { timeLeft > cleanMatchTime ? 'Warm-up!' : `${minutesLeft}:${secondsLeft}` }</Text>
              <Text style={styles.tapToPause}>Tap to pause</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      { this.state.isPaused
        ? <View style={styles.pauseScreen}>
          <BlurView style={styles.pauseBlur} blurAmount={10} />
          <View style={styles.pauseMenuContainer}>
            <Text style={styles.pauseTitle}>Paused</Text>
            <TouchableOpacity style={styles.pauseThrowButton} onPress={() => this.throwAPuck()}>
              <Text style={styles.pauseThrowButtonText}>Throw a puck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pauseResumeButton} onPress={() => this.resumeGame()}>
              <Text style={styles.pauseResumeButtonText}>Resume match</Text>
            </TouchableOpacity>
          </View>
        </View> : undefined }
    </View>
  }
}

const mapStateToProps = (state) => ({
  state: state,
  currentPeriod: state.game.currentPeriod,
  matchTime: state.game.totalMatchTime,
  timeLeft: state.game.matchTimeLeft,
  status: state.game.status,
  cleanMatchTime: state.gameSettings.matchTime * 60
})

export default connect(mapStateToProps)(GameScreen)
