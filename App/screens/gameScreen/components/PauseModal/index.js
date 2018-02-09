import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {BlurView} from 'react-native-blur';
import i18n from 'react-native-i18n';

import styles from './styles';

export const PauseModal = ({ throwAPuck, resumeGame, blurredViewRef }) => (
  <View elevation={10} style={styles.pauseScreen}>
    <BlurView downsampleFactor={1} blurRadius={10} style={styles.pauseBlur} viewRef={blurredViewRef} blurAmount={10} />
    <View elevation={20} style={styles.pauseMenuContainer}>
      <Text style={styles.pauseTitle}>{i18n.t('game.pause.title')}</Text>
      <TouchableOpacity style={styles.pauseThrowButton} onPress={() => throwAPuck()}>
        <Text style={styles.pauseThrowButtonText}>{i18n.t('game.pause.throwAPuck')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pauseResumeButton} onPress={() => resumeGame()}>
        <Text style={styles.pauseResumeButtonText}>{i18n.t('game.pause.resumeMatch')}</Text>
      </TouchableOpacity>
    </View>
  </View>
)