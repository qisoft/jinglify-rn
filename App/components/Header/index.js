import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export const Header = (children, title) => {
  <View style={styles.header}>
    <Text style={styles.titleText}>{title}</Text>
    {children}
  </View>
}