import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const SongTitle = ({ song }) => (
  <View style={styles.songTitleContainer}>
    <Text style={styles.songTitle}>{song.artist} - {song.title}</Text>
  </View>
);