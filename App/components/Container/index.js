import React from 'react';
import { SafeAreaView, View } from 'react-native';

import styles from './styles';
export class Container extends React.Component {
  render() {
    const { children, dontUseSafeArea, ...other } = this.props;
    const component = dontUseSafeArea ? View : SafeAreaView;
    return dontUseSafeArea ? (
      <View { ...other } style={styles.container}>
        {children}
      </View>
    ) : (
      <SafeAreaView { ...other } style={styles.container}>
        {children}
      </SafeAreaView>
    );
  }
}
