import React from 'react';
import { View } from 'react-native';

import styles from './styles';

export const Section = ({ children }) => (
  <View style={styles.section}>
    {children}
  </View>
)