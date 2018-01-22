import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

export const NoSongs = ({ loadTracks }) => (
  <View style={styles.noSongsContainer}>
    <Text style={styles.noSongsTitle}>You have no Jingles yet</Text>
    <TouchableOpacity onPress={() => loadTracks()}>
      <Text style={styles.noSongsButton}>Add songs</Text>
    </TouchableOpacity>
  </View>
)