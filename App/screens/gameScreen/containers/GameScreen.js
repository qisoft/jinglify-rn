import React from 'react'
import { AppState, View, Text, TouchableOpacity, Alert, LayoutAnimation, findNodeHandle } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import KeepAwake from 'react-native-keep-awake'

import Game from '../../../services/gameService'
import gameActions from '../redux'
import { CircleTimer, PauseModal, SongTitle, StatusText } from '../components';
import { Screen, Container, Section, Header } from '../../../components';
import styles from './GameScreenStyles.js';

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
    return <Screen>
      <Container style={styles.container} ref={x => {
        let ref = findNodeHandle(x)
        if (this.state.blurredRef !== ref && ref !== 0 && ref !== null) {
          this.setState({blurredRef: ref})
        }
      }}>
        <Section>
          <Header title={currentPeriod === 0 ? 'Overtime' : `Period #${currentPeriod}`}>
            <TouchableOpacity onPress={() => this.endGame()}>
              <Text style={styles.buttonRed}>End match</Text>
            </TouchableOpacity>
          </Header>
        </Section>
        <SongTitle song={this.state.song}/>
        <View style={styles.gameContainer}>
          <CircleTimer timeLeft={timeLeft} cleanMatchTime={cleanMatchTime} pauseGame={() => this.pauseGame()} />
        </View>
        <StatusText status={status}/>
      </Container>
      { this.state.isPaused
        ? (
          <PauseModal
            throwAPuck={() => this.throwAPuck()}
            resumeGame={() => this.resumeGame()}
            blurredViewRef={this.state.blurredRef}
          />
        )
        : undefined }
    </Screen>
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
