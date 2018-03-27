import React from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import {BlurView} from 'react-native-blur';
import i18n from 'react-native-i18n';

import styles from './styles';

export class PauseModal extends React.Component {
  state = {
    y: new Animated.Value(368),
  }

  slideIn = () => {
    return Animated.spring(this.state.y, {
      toValue: 0,
      useNativeDriver: true
    }).start();
  }

  slideOut = () => {
    Animated.spring(this.state.y, {
      toValue: 368,
      useNativeDriver: true,
    }).start();
  }

  componentDidMount() {
    this.slideIn();
  }

  async throwAPuck() {
    this.slideOut();
    setTimeout(() => {
      this.props.throwAPuck();
    }, 150);
  }

  async resumeMatch() {
    this.slideOut();

    setTimeout(() => {
      this.props.resumeGame();
    }, 150);
  }

  render () {
    const { throwAPuck, resumeGame, blurredViewRef } = this.props;
    return (
      <View style={styles.pauseScreen}>
        <BlurView downsampleFactor={1} blurRadius={10} style={styles.pauseBlur} viewRef={blurredViewRef} blurAmount={10} />
        <Animated.View style={[styles.pauseMenuContainer, { transform: [ { translateY: this.state.y } ] }]}>
          <Text style={styles.pauseTitle}>{i18n.t('game.pause.title')}</Text>
          <TouchableOpacity style={styles.pauseThrowButton} onPress={() => this.throwAPuck()}>
            <Text style={styles.pauseThrowButtonText}>{i18n.t('game.pause.throwAPuck')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pauseResumeButton} onPress={() => this.resumeMatch()}>
            <Text style={styles.pauseResumeButtonText}>{i18n.t('game.pause.resumeMatch')}</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }
}
