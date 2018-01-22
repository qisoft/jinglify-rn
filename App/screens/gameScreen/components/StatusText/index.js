import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const StatusText = ({ status }) => (
  <View style={styles.statusContainer}>
    <Text style={styles.statusText}>{status}</Text>
  </View>
);