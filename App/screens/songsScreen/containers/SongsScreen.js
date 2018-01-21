import React from 'react'
import { View, Text, TouchableOpacity, ListView, LayoutAnimation, NativeModules } from 'react-native'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'

import styles from './SongsScreenStyles'
import songsActions from '../redux';
import { Screen, Container, Section, Header } from '../../../components';

import { SongRow, Separator, NoSongs, EditButton } from '../components'

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
    let dataBlob = this.createBlobForSongs(props.songs)
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(dataBlob)
    }
  }

  createBlobForSongs (songs) {
    let dataBlob = {
      songs: songs
    }
    return dataBlob
  }

  componentWillReceiveProps (newProps) {
    if (newProps.songs) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(
          this.createBlobForSongs(newProps.songs))
      })
    }
  }

  changeEditingState (isEditing) {
    LayoutAnimation.easeInEaseOut()
    this.props.setEditingState(isEditing)
  }

  renderRow (row) {
    return <SongRow row={row} removeSong={this.props.removeSong} />
  }

  renderSeparator (section, row) {
    return <Separator section={section} row={row} />
  }

  loadTracks () {
    NativeModules.AudioPlayer.getTracks((err, tracks) => {
      if (err === null) {
        this.props.addSongs(tracks)
      }
    })
  }

  renderEditButton () {
    if(this.props.songs.length > 0) {
      return <EditButton
        isEditing={this.props.isEditing}
        loadTracks={this.loadTracks}
        changeEditingState={this.props.changeEditingState}
      />;
    }
    return undefined;
  }

  render () {
    return <Screen>
      <Container>
        <Section>
          <Header title={'Jingles'}>
            { !this.props.isEditing
              ? <TouchableOpacity onPress={() => NavigationActions.pop()}>
                <Text style={styles.buttonRed}>Close</Text>
              </TouchableOpacity>
              : <TouchableOpacity onPress={() => this.changeEditingState(false)}>
                <Text style={[styles.button, styles.doneButton]}>Done</Text>
              </TouchableOpacity>
            }
          </Header>
        </Section>
        <Section>
          { this.renderEditButton() }
        </Section>
        {
          this.props.songs.length > 0
            ? <View style={styles.list}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={this.renderSeparator}
                enableEmptySections={false}
              />
            </View>
            : <NoSongs loadTracks={this.loadTracks} />
        }
      </Container>
    </Screen>
  }
}

const mapStateToProps = (state) => ({
  songs: state.songs.songs,
  isEditing: state.songs.songsIsEditing
})

const mapDispatchToProps = (dispatch) => ({
  addSongs: (songs) => dispatch(songsActions.addSongs(songs)),
  removeSong: (song) => dispatch(songsActions.removeSong(song)),
  setEditingState: (isEditing) => dispatch(songsActions.setEditingState(isEditing))
})

export default connect(mapStateToProps, mapDispatchToProps)(SongsScreen)

