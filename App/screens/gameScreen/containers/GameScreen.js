import React from 'react'
import { AppState, View, Text, TouchableOpacity, Alert, LayoutAnimation, findNodeHandle } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import KeepAwake from 'react-native-keep-awake'
import i18n, { getLanguages } from 'react-native-i18n';

import Game from '../../../services/gameService'
import { CircleTimer, PauseModal, SongTitle, StatusText } from '../components';
import { Screen, Container, Section, Header } from '../../../components';
import styles from './GameScreenStyles.js';
import {sendMessage, subscribeToMessages} from 'react-native-watch-connectivity';

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
    Alert.alert(i18n.t('game.endMatchAlert.title'), i18n.t('game.endMatchAlert.description'), [
      { text: i18n.t('game.endMatchAlert.yes'), onPress: () => { this.stopGame() }, style: 'destructive' },
      { text: i18n.t('game.endMatchAlert.no'), onPress: () => { } }
    ])
  }

  stopGame() {
    this.game.stopGame()
    sendMessage({ event: 'endMatch' });
  }
  pauseGame () {
    this.game.pauseGame()
    sendMessage({ event: 'pause' });
  }

  resumeGame () {
    this.props.currentGame.resumeGame()
    sendMessage({ event: 'resume' });
  }

  throwAPuck () {
    this.game.throwAPuck()
    sendMessage({ event: 'throw' });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.isPaused !== this.props.isPaused) {
      LayoutAnimation.easeInEaseOut()
      this.setState({ isPaused: nextProps.isPaused })
    } else if (nextProps.currentGame !== this.props.currentGame) {
      if (nextProps.currentGame === null){
        NavigationActions.pop();
      }
    }
  }


  componentDidMount () {
    getLanguages().then(langs => {
      console.log(langs);
      this.game = new Game(this.props.dispatch, this.props.state, langs[0]);
      this.game.startGame(song => this.onSongChange(song));
    });
    this.unsubscribe = subscribeToMessages((err, message, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      switch (message.command) {
        case 'pause': {
          this.game.pauseGame();
          reply({ success: true });
          break;
        }
        case 'resume': {
          this.game.resumeGame();
          reply({ success: true });
          break;
        }
        case 'throw': {
          this.game.throwAPuck();
          reply({ success: true });
          break;
        }
        case 'endMatch': {
          this.game.stopGame();
          reply({ success: true });
          break;
        }
      }
    })
    AppState.addEventListener('change', this._handleAppStateChange)
    KeepAwake.activate()
  }

  onSongChange (song) {
    this.setState({ song })
  }

  componentWillUnmount () {
    AppState.removeEventListener('change', this._handleAppStateChange)
    KeepAwake.deactivate()
    this.game.stopGame();
    this.unsubscribe();
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
          <Header title={currentPeriod === 0 ? i18n.t('game.overtime') : i18n.t('game.period', { period: currentPeriod })}>
            <TouchableOpacity onPress={() => this.endGame()}>
              <Text style={styles.buttonRed}>{i18n.t('game.endMatch')}</Text>
            </TouchableOpacity>
          </Header>
        </Section>
        <SongTitle song={this.state.song}/>
        <View style={styles.gameContainer}>
          <CircleTimer timeLeft={timeLeft} cleanMatchTime={cleanMatchTime} pauseGame={() => this.pauseGame()} />
        </View>
      </Container>
      <StatusText status={status}/>
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
  isPaused: state.game.isPaused,
  currentGame: state.game.currentGame,
  cleanMatchTime: state.gameSettings.matchTime * 60
})

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
