import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

class PausableStatusBar extends Component {
  componentDidMount () {
  }

  render () {
    let { isPaused } = this.props
    return (
        <StatusBar barStyle={'light-content' } />
    )
  }
}

const mapStateToProps = (state) => ({
  isPaused: state.game.isPaused
})
// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PausableStatusBar)
