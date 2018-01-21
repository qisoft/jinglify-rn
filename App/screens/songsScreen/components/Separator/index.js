import React from 'react';
import { View } from 'react-native';

import styles from './styles';

export const Separator = (section, row) => (
  <View key={section + row} style={styles.separator} />
)
