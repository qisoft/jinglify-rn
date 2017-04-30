import React from 'react'
import { View, Text, TouchableOpacity, ListView, Image, LayoutAnimation, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './Styles/SongsScreenStyles'
import gameSettingsActions from '../Redux/GameSettingsRedux'
import { Images } from '../Themes'

class SongsScreen extends React.Component {
  static get defaultProps () {
    return {
      songs: [
        {
          persistentId: '1',
          artist: 'Enter Shikari',
          title: 'Sorry you\'re not a winner',
          albumTitle: 'Take to the skies',
          artwork: 'https://upload.wikimedia.org/wikipedia/ru/0/02/Take_to_the_skies.JPG',
          assetUrl: ''
        },
        {
          persistentId: '2',
          artist: 'Enter Shikari',
          title: 'Anything can happen in next half hour',
          albumTitle: 'Take to the skies',
          artwork: 'https://upload.wikimedia.org/wikipedia/ru/0/02/Take_to_the_skies.JPG',
          assetUrl: ''
        }
      ]
    }
  }
  constructor (props) {
    super(props)
    const rowHasChanged = (r1, r2) => (r1.artist !== r2.artist && r1.title !== r2.title) || r1.isEditing !== r2.isEditing
    const sectionHeaderHasChanged = (s1, s2) => s1 !== s2
    const ds = new ListView.DataSource({ rowHasChanged, sectionHeaderHasChanged })
    let dataBlob = this.createBlobForSongs(props.songs, false)
    this.state = {
      isEditing: false,
      songs: props.songs,
      dataSource: ds.cloneWithRowsAndSections(dataBlob)
    }
  }

  createBlobForSongs (songs, isEditing) {
    let dataBlob = {
      nonProtected: songs.filter(s => s.assetUrl.length > 0).map(x => ({
        ...x,
        isEditing: isEditing
      })),
      protected: songs.filter(s => s.assetUrl.length === 0).map(x => ({
        ...x,
        isEditing: isEditing
      }))
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
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.createBlobForSongs(newProps.songs, this.state.isEditing)),
        songs: newProps.songs
      })
    }
  }

  changeEditingState (isEditing) {
    LayoutAnimation.spring()
    this.setState({
      dataSource: this.state.dataSource.cloneWithRowsAndSections(this.createBlobForSongs(this.state.songs, isEditing)),
      isEditing: isEditing
    })
  }

  renderRow (row) {
    return (
      <View style={styles.listRow} key={row.persistentId}>
        { row.isEditing
          ? <TouchableOpacity onPress={() => this.props.removeSong(row) } style={styles.songDelete}>
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
    return <View key={section + row} style={styles.separator}></View>
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
      this.props.addSongs(tracks)
    })
  }

  renderEditButton () {
    if (this.state.songs.length > 0) {
      if (this.state.isEditing) {
        return <TouchableOpacity onPress={() => this.loadTracks()}>
          <Text style={styles.button}><Image source={Images.add} /> Add more songs</Text>
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
            { !this.state.isEditing
              ? <TouchableOpacity onPress={() => NavigationActions.pop()}>
                <Text style={styles.buttonRed}>Close</Text>
              </TouchableOpacity>
              : <TouchableOpacity onPress={() => this.changeEditingState(false)}>
                <Text style={styles.button}>Done</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
        <View style={styles.section}>
          { this.renderEditButton() }
        </View>
        {
          this.state.songs.length > 0
            ? <View
            style={styles.list}>
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
  songs: state.gameSettings.songs
})

const mapDispatchToProps = (dispatch) => ({
  addSongs: (songs) => dispatch(gameSettingsActions.addSongs(songs)),
  removeSong: (song) => dispatch(gameSettingsActions.removeSong(song))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen)

