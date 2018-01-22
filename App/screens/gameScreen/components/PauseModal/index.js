import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {BlurView} from 'react-native-blur';

import styles from './styles';

export const PauseModal = ({ throwAPuck, resumeGame, blurredViewRef }) => (
  <View elevation={10} style={styles.pauseScreen}>
    <BlurView downsampleFactor={1} blurRadius={10} style={styles.pauseBlur} viewRef={blurredViewRef} blurAmount={10} />
    <View elevation={20} style={styles.pauseMenuContainer}>
      <Text style={styles.pauseTitle}>Paused</Text>
      <TouchableOpacity style={styles.pauseThrowButton} onPress={() => throwAPuck()}>
        <Text style={styles.pauseThrowButtonText}>Throw a puck</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.pauseResumeButton} onPress={() => resumeGame()}>
        <Text style={styles.pauseResumeButtonText}>Resume match</Text>
      </TouchableOpacity>
    </View>
  </View>
)