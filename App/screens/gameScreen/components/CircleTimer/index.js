import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import i18n from 'react-native-i18n';

import styles from './styles';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Colors } from '../../../../theme';
import Utils from '../../../../services/utils';

export const CircleTimer = ({ timeLeft, cleanMatchTime, pauseGame }) => {
  let minutesLeft = Utils.pad(Math.floor(timeLeft / 60))
  let secondsLeft = Utils.pad(timeLeft % 60)
  let progress = ((cleanMatchTime - timeLeft) / cleanMatchTime) * 100
  return (
    <View style={styles.circleContainer}>
      <AnimatedCircularProgress
        rotation={0}
        style={styles.circleProgress}
        tintColor={Colors.brand}
        backgroundColor={Colors.greyBg}
        size={310}
        width={10}
        fill={progress} />

      <TouchableOpacity style={styles.circle} onPress={() => pauseGame()}>
        <Text style={styles.timer}>
          { timeLeft > cleanMatchTime ? '--:--' : `${minutesLeft}:${secondsLeft}` }</Text>
        <Text style={styles.tapToPause}>{i18n.t('game.tapToPause')}</Text>
      </TouchableOpacity>
    </View>
  )
}

