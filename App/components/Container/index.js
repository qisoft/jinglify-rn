import React from 'react';
import { View } from 'react-native';

import styles from './styles';

export const Container = ({ children }) => (
  <View style={styles.container}>
    {children}
  </View>
)