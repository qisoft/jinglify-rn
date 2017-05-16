import React from 'react'
import { View, Text, TouchableOpacity, ListView, Image, LayoutAnimation, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/SongsScreenStyles'
import gameSettingsActions from '../Redux/GameSettingsRedux'
import { Images } from '../Themes'

class SongsScreen extends React.Component {
  static get defaultProps () {
    return {
      songs: [ ]
    }
  }
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => (r1.playbackUrl && r2.playbackUrl) || r1.isEditing !== r2.isEditing
    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    const ds = new ListView.DataSource({ rowHasChanged, sectionHeaderHasChanged })
    let dataBlob = this.createBlobForSongs(props.protectedSongs, props.nonProtectedSongs)
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob)
    }
  }

  createBlobForSongs (protectedSongs, nonProtectedSongs) {
    let dataBlob = {
      nonProtected: nonProtectedSongs,
      protected: protectedSongs
    }
    if (dataBlob.protected.length === 0) {
      delete dataBlob.protected
    }
    if (dataBlob.nonProtected.length === 0) {
      delete dataBlob.nonProtected
    }
    return dataBlob
  }

  componentWillReceiveProps (newProps) {
    if (newProps.songs) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          this.createBlobForSongs(newProps.protectedSongs, newProps.nonProtectedSongs))
      })
    }
  }

  changeEditingState (isEditing) {
    LayoutAnimation.easeInEaseOut()
    this.props.setEditingState(isEditing)
  }

  renderRow (row) {
    return (
      <View style={styles.listRow} key={row.persistentId}>
        { row.isEditing
          ? <TouchableOpacity onPress={() => this.props.removeSong(row)} style={styles.songDelete}>
            <Image source={Images.delete}/>
          </TouchableOpacity>
          : undefined }
        <Image style={styles.songArtwork} source={{ uri: row.artwork }} resizeMode={'stretch'} />
        <View style={styles.songTitleContainer}>
          <Text style={styles.songTitle}>{row.title}</Text>
          <Text style={styles.songArtist}>{row.artist}</Text>
          <Text style={styles.songArtist}>{row.albumTitle}</Text>
        </View>
      </View>
    )
  }

  renderSeparator (section, row) {
    return <View key={section + row} style={styles.separator} />
  }

  renderSection (data, sectionId) {
    const sectionHeaders = {
      protected: 'Protected',
      nonProtected: 'Non-protected'
    }
    return <View style={styles.listSectionHeader}><Text style={styles.listSectionHeaderText}>{sectionHeaders[sectionId]}</Text></View>
  }

  loadTracks () {
    NativeModules.AudioPlayer.getTracks((err, tracks) => {
      if (err === null) {
        this.props.addSongs(tracks)
      }
    })
  }

  renderEditButton () {
    if (this.props.songs.length > 0) {
      if (this.props.isEditing) {
        return <TouchableOpacity style={styles.addMoreSongs} onPress={() => this.loadTracks()}>
          <Image source={Images.add} /><Text style={styles.button}> Add more songs</Text>
        </TouchableOpacity>
      }
      return <TouchableOpacity onPress={() => this.changeEditingState(true)}>
        <Text style={styles.button}>Edit</Text>
      </TouchableOpacity>
    }
    return undefined
  }

  render () {
    return <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.header}>
            <Text style={styles.titleText}>Jingles</Text>
            { !this.props.isEditing
              ? <TouchableOpacity onPress={() => NavigationActions.pop()}>
                <Text style={styles.buttonRed}>Close</Text>
              </TouchableOpacity>
              : <TouchableOpacity onPress={() => this.changeEditingState(false)}>
                <Text style={[styles.button, styles.doneButton]}>Done</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.section}>
          { this.renderEditButton() }
        </View>
        {
          this.props.songs.length > 0
            ? <View style={styles.list}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderSectionHeader={this.renderSection}
                renderSeparator={this.renderSeparator}
                enableEmptySections={false}
              />
            </View>
            : <View style={styles.noSongsContainer}>
              <Text style={styles.noSongsTitle}>You have no Jingles yet</Text>
              <TouchableOpacity onPress={() => this.loadTracks()}>
                <Text style={styles.noSongsButton}>Add songs</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
    </View>
  }
}

const mapStateToProps = (state) => ({
  songs: state.gameSettings.songs,
  protectedSongs: state.gameSettings.protectedSongs,
  nonProtectedSongs: state.gameSettings.nonProtectedSongs,
  isEditing: state.gameSettings.songsIsEditing
})

const mapDispatchToProps = (dispatch) => ({
  addSongs: (songs) => dispatch(gameSettingsActions.addSongs(songs)),
  removeSong: (song) => dispatch(gameSettingsActions.removeSong(song)),
  setEditingState: (isEditing) => dispatch(gameSettingsActions.setEditingState(isEditing))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen)

