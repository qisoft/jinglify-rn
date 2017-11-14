import React from 'react'
import { AppState, View, Text, TouchableOpacity, Alert, LayoutAnimation, findNodeHandle } from 'react-native'
import { connect } from 'react-redux'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { BlurView } from 'react-native-blur'
import KeepAwake from 'react-native-keep-awake'
import VolumeSlider from 'react-native-volume-slider'

import Game from '../Services/GameService'
import gameActions from '../Redux/GameRedux'
import Utils from '../Services/Utils'
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
  constructor (props) {
    super(props)
    this.state = {
      isPaused: false,
      blurredRef: 0,
      song: {}
    }
  }

  endGame () {
    Alert.alert('End match', 'Do you want to end the match?', [
      { text: 'Yes', onPress: () => { this.game.stopGame() }, style: 'destructive' },
      { text: 'No', onPress: () => { } }
    ])
  }

  pauseGame () {
    LayoutAnimation.easeInEaseOut()
    this.setState({ isPaused: true })
    this.props.setPaused(true)
    this.game.pauseGame()
  }

  resumeGame () {
    LayoutAnimation.easeInEaseOut()
    this.setState({ isPaused: false })
    this.props.setPaused(false)
    this.game.resumeGame()
  }

  throwAPuck () {
    LayoutAnimation.easeInEaseOut()
    this.setState({ isPaused: false })
    this.props.setPaused(false)
    this.game.throwAPuck()
  }

  componentDidMount () {
    this.game = new Game(this.props.dispatch, this.props.state)
    this.game.startGame(() => {
      NavigationActions.pop()
    }, song => this.onSongChange(song))
    AppState.addEventListener('change', this._handleAppStateChange)
    KeepAwake.activate()
  }

  onSongChange (song) {
    this.setState({ song })
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
    KeepAwake.deactivate()
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.pauseGame()
    }
  }

  render () {
    let { timeLeft, status, currentPeriod, cleanMatchTime } = this.props
    let minutesLeft = Utils.pad(Math.floor(timeLeft / 60))
    let secondsLeft = Utils.pad(this.props.timeLeft % 60)
    let progress = ((cleanMatchTime - timeLeft) / cleanMatchTime) * 100
    return <View style={styles.mainContainer}>
      <View style={styles.container} ref={x => {
        let ref = findNodeHandle(x)
        console.log(ref)
        if (this.state.blurredRef !== ref && ref !== 0 && ref !== null) {
          this.setState({blurredRef: ref})
        }
      }}>
        <View style={styles.section}>
          <View style={[styles.header]}>
            <Text style={styles.titleText}>{ currentPeriod === 0 ? 'Overtime' : `Period #${currentPeriod}` }</Text>
            <TouchableOpacity onPress={() => this.endGame()}>
              <Text style={styles.buttonRed}>End match</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.songTitleContainer}>
          <Text style={styles.songTitle}>{this.state.song.artist} - {this.state.song.title}</Text>
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
              fill={progress} />

            <TouchableOpacity style={styles.circle} onPress={() => this.pauseGame()}>
              <Text style={styles.timer}>
                { timeLeft > cleanMatchTime ? '--:--' : `${minutesLeft}:${secondsLeft}` }</Text>
              <Text style={styles.tapToPause}>Tap to pause</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      { this.state.isPaused
        ? <View elevation={10} style={styles.pauseScreen}>
          <BlurView downsampleFactor={1} blurRadius={10} style={[styles.pauseBlur]} viewRef={this.state.blurredRef} blurAmount={10} />
          <View elevation={20} style={styles.pauseMenuContainer}>
            <Text style={styles.pauseTitle}>Paused</Text>
            <TouchableOpacity style={styles.pauseThrowButton} onPress={() => this.throwAPuck()}>
              <Text style={styles.pauseThrowButtonText}>Throw a puck</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.pauseResumeButton} onPress={() => this.resumeGame()}>
              <Text style={styles.pauseResumeButtonText}>Resume match</Text>
            </TouchableOpacity>
          </View>
        </View>
        : undefined }
      <VolumeSlider style={{ height: 0 }} />
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

const mapDispatchToProps = (dispatch) => ({
  setPaused: isPaused => dispatch(gameActions.setPaused(isPaused)),
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)
