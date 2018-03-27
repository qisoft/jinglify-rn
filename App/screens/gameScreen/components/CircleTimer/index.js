import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import i18n from 'react-native-i18n';

import styles from './styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Circle } from 'react-native-progress';
import { Colors } from '../../../../theme';
import Utils from '../../../../services/utils';

export const CircleTimer = ({ timeLeft, cleanMatchTime, pauseGame }) => {
  let minutesLeft = Utils.pad(Math.floor(timeLeft / 60))
  let secondsLeft = Utils.pad(timeLeft % 60)
  let progress = ((cleanMatchTime - timeLeft) / cleanMatchTime)
  return (
    <View style={styles.circleContainer}>
      <Circle
        style={styles.circleProgress}
        color={Colors.brand}
        unfilledColor={Colors.brandFaded}
        size={314}
        thickness={10}
        strokeCap={progress > 0 ? 'round' : 'butt'}
        borderWidth={0}
        progress={progress} />

      <TouchableOpacity style={styles.circle} onPress={() => pauseGame()}>
        <Text style={styles.timer}>
          { timeLeft > cleanMatchTime ? '--:--' : `${minutesLeft}:${secondsLeft}` }</Text>
        <Text style={styles.tapToPause}>{i18n.t('game.tapToPause')}</Text>
      </TouchableOpacity>
    </View>
  )
}
