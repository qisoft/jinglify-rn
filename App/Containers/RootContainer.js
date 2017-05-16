import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import NavigationRouter from '../Navigation/NavigationRouter'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
  componentDidMount () {
  }

  render () {
    let { isPaused } = this.props
    return (
      <View style={styles.applicationView}>
        <StatusBar backgroundColor={isPaused ? '#666464' : 'white'} barStyle={isPaused ? 'light-content' : 'dark-content'} />
        <NavigationRouter />
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  isPaused: state.game.isPaused
})
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
