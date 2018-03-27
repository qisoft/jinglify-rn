import React, { Component } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info'
import I18n from '../../../i18n/I18n';

import { Screen, Container, Section, Header, BigBlueButton, RedButton } from '../../../components';
import { BlurryBackground, StepperSetting, ShortSeparator }from '../components';
import styles from './GetStartedScreenStyles';

import settingsActions from '../redux'
import {sendMessage, subscribeToMessages} from 'react-native-watch-connectivity';

class GetStartedScreen extends Component {
  startMatch() {
    sendMessage({ event: 'startMatch' });
    NavigationActions.game()
  }

  componentDidMount() {
    this.unsubscribe = subscribeToMessages((err, message, reply) => {
      if (err) {
        console.log(err);
        return;
      }
      switch (message.command) {
        case 'startMatch': {
          this.startMatch();
          reply({ success: true });
          break;
        }
      }
    })
  }

  componentWillUnmount() {
    try {
      this.unsubscribe();
    } catch (e) {
      console.log(e);
    }
  }


  render () {
    let { matchTime, songsCount, periodsCount } = this.props
    let { setMatchTime, setPeriodsCount } = this.props

    return <Screen>
      <Container>
        <Section style={styles.section}>
          <Header title={I18n.t('getStarted.title')} />
        </Section>
        <View style={{ marginTop: 10 }}>
          <BlurryBackground>
            <BigBlueButton
              onPress={() => NavigationActions.songs()}
              title={I18n.t('getStarted.jingles')}
              subtitleNumber={`${songsCount}`}
              subtitleText={I18n.t('getStarted.songsCount', { count: songsCount })}
            />
          </BlurryBackground>
        </View>
        <View elevation={21}>
          <StepperSetting
            title={I18n.t('getStarted.matchTime')}
            onChange={setMatchTime}
            value={matchTime}
            subtitleText={I18n.t('getStarted.minutes')}
          />
          <ShortSeparator />
          <StepperSetting
            title={I18n.t('getStarted.periodsTitle')}
            onChange={setPeriodsCount}
            value={periodsCount}
            subtitleText={I18n.t('getStarted.periodsCount')}
          />
        </View>
        <View style={styles.redButtonContainer}>
          <RedButton
            style={styles.redButton}
            disabled={songsCount === 0 && !DeviceInfo.isEmulator()}
            onPress={() => this.startMatch()}
            title={I18n.t('getStarted.startMatch')} />
        </View>
      </Container>
    </Screen>
  }
}

const mapStateToProps = (state) => ({
  songsCount: state.songs.songsCount,
  matchTime: state.gameSettings.matchTime,
  periodsCount: state.gameSettings.periodsCount
})

const mapDispatchToProps = (dispatch) => ({
  setMatchTime: (matchTime) => dispatch(settingsActions.setMatchTime(matchTime)),
  setPeriodsCount: (periodsCount) => dispatch(settingsActions.setPeriodsCount(periodsCount))
})

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedScreen);
