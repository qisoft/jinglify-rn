import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import i18n from 'react-native-i18n';
import styles from './styles';

export const NoSongs = ({ loadTracks }) => (
  <View style={styles.noSongsContainer}>
    <Text style={styles.noSongsTitle}>{i18n.t('songs.noSongs')}</Text>
    <TouchableOpacity onPress={() => loadTracks()}>
      <Text style={styles.noSongsButton}>{i18n.t('songs.add')}</Text>
    </TouchableOpacity>
  </View>
)