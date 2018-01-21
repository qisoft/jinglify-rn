import React from 'react';
import { View } from 'react-native';

import styles from './styles';

export const Screen = (children) => {
  <View style={styles.mainContainer}>
    {children}
  </View>
}