import React from 'react'
import { TouchableOpacity, Image, View, Text } from 'react-native'
import { Images } from '../../../../theme'

import styles from './styles'

export const SongRow = (row, removeSong) => (
  <View style={styles.listRow} key={row.persistentId}>
    { row.isEditing
      ? <TouchableOpacity onPress={() => removeSong(row)} style={styles.songDelete}>
        <Image source={Images.delete} />
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
