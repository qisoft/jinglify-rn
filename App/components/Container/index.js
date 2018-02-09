import React from 'react';
import { SafeAreaView } from 'react-native';

import styles from './styles';
export class Container extends React.Component {
  render() {
    const { children, ...other } = this.props;
    return <SafeAreaView { ...other } style={styles.container}>
      {children}
    </SafeAreaView>;
  }
}