import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'
import DeviceInfo from 'react-native-device-info'

import BigBlueButton from '../Components/BigBlueButton'

import styles from './Styles/GetStartedScreenStyles'
import BlurryBackground from '../Components/BlurryBackground'
import StepperSetting from '../Components/StepperSetting'
import ShortSeparator from '../Components/ShortSeparator'
import RedButton from '../Components/RedButton'

import settingsActions from '../Redux/GameSettingsRedux'
class GetStartedScreen extends Component
{
  render () {
    let { matchTime, songsCount, periodsCount } = this.props
    let { setMatchTime, setPeriodsCount } = this.props

    return <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.titleText}>{'Get started'}</Text>
          </View>
        </View>
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
      </View>
    </View>
  }
}

const mapStateToProps = (state) => ({
  songsCount: state.gameSettings.songsCount,
  matchTime: state.gameSettings.matchTime,
  periodsCount: state.gameSettings.periodsCount
})

const mapDispatchToProps = (dispatch) => ({
  setMatchTime: (matchTime) => dispatch(settingsActions.setMatchTime(matchTime)),
  setPeriodsCount: (periodsCount) => dispatch(settingsActions.setPeriodsCount(periodsCount))
})

export default connect(mapStateToProps, mapDispatchToProps)(GetStartedScreen)
