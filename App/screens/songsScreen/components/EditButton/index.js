import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { Images } from '../../../../theme';
import styles from './styles';

export const EditButton = ({ isEditing, loadTracks, changeEditingState }) => isEditing ?
  (
    <TouchableOpacity style={styles.addMoreSongs} onPress={() => loadTracks()}>
      <Image source={Images.add} /><Text style={styles.button}> Add more songs</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => changeEditingState(true)}>
      <Text style={styles.button}>Edit</Text>
    </TouchableOpacity>
  );
