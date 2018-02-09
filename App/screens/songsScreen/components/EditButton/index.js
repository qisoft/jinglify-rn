import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import i18n from 'react-native-i18n';
import { Images } from '../../../../theme';
import styles from './styles';


export const EditButton = ({ isEditing, loadTracks, changeEditingState }) => isEditing ?
  (
    <TouchableOpacity style={styles.addMoreSongs} onPress={() => loadTracks()}>
      <Image source={Images.add} /><Text style={styles.button}> {i18n.t('songs.addMore')}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => changeEditingState(true)}>
      <Text style={styles.button}>{i18n.t('songs.edit')}</Text>
    </TouchableOpacity>
  );
