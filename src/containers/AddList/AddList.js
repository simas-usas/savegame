import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, View, TextInput, Dimensions } from 'react-native';
import { map } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';
import AddButton from 'components/AddButton/AddButton';
import PlaceholderText from 'components/PlaceholderText/PlaceholderText';
import { FONT_COLOR } from 'styles/colors';

const { width, height } = Dimensions.get('window');

import data from '../../data';

const AddList = ({ navigation, setUserList }) => {
  const [title, setTitle] = useState('');
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    navigation.setParams({
      onSubmit: () => {
        setUserList({ title, entries });
        setTitle('');
        setEntries([]);
      },
    });
  }, [title, entries, navigation, setUserList]);
  return (
    <>
      <ScrollView style={styles.scrollView}>
        <View style={styles.titleInputContainer}>
          <TextInput
            style={styles.titleInput}
            placeholder="Title..."
            placeholderTextColor={FONT_COLOR}
            underlineColorAndroid={FONT_COLOR}
            value={title}
            onChangeText={value => setTitle(value)}
          />
        </View>
        <View style={styles.entriesContainer}>
          {map(
            data.filter(item => entries.some(entry => entry === item.id)),
            item => (
              <GameThumbnail id={item.id} navigation={navigation} />
            ),
          )}
        </View>
      </ScrollView>
      {!entries.length && <PlaceholderText text={'No entries added.'} />}
      <AddButton
        onPress={() =>
          navigation.navigate('GameSearch', {
            onPress: id => {
              setEntries([...entries, id]);
              navigation.goBack();
            },
          })
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height,
    width,
  },
  titleInputContainer: {
    alignItems: 'center',
  },
  titleInput: {
    color: FONT_COLOR,
    fontSize: 18,
    width: width * 0.9,
  },
  entriesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: width * 0.005,
  },
});

const mapDispatchToProps = dispatch => ({
  setUserList: payload => dispatch({ type: 'SET_USER_LIST', payload }),
});

export default connect(null, mapDispatchToProps)(AddList);
