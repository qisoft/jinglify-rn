import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info'

import BigBlueButton from '../../../components/BigBlueButton/index'
import { Screen, Container, Section, Header } from '../../../components';

import styles from './GetStartedScreenStyles'
import BlurryBackground from '../../../components/BlurryBackground/index'
import StepperSetting from '../../../components/StepperSetting/index'
import ShortSeparator from '../../../components/ShortSeparator/index'
import RedButton from '../../../components/RedButton/index'

import settingsActions from '../redux'
class GetStartedScreen extends Component
{
  render () {
    let { matchTime, songsCount, periodsCount } = this.props
    let { setMatchTime, setPeriodsCount } = this.props

    return <Screen>
      <Container>
        <Section style={styles.section}>
          <Header title={'Get started'} />
        </Section>
        <View style={{ marginTop: 10 }}>
          <BlurryBackground>
            <BigBlueButton onPress={() => NavigationActions.songs()} title={'Jingles'} subtitleNumber={`${songsCount}`} subtitleText={'songs'} />
          </BlurryBackground>
        </View>
        <View elevation={21}>
          <StepperSetting title={'Match time'} onChange={setMatchTime} value={matchTime} subtitleText={'minutes'} />
          <ShortSeparator />
          <StepperSetting title={'Periods'} onChange={setPeriodsCount} value={periodsCount} subtitleText={'periods'} />
        </View>
        <View style={styles.redButtonContainer}>
          <RedButton disabled={songsCount === 0 && !DeviceInfo.isEmulator()} onPress={() => NavigationActions.game()} style={styles.redButton} title='Start a match' />
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

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedScreen)
