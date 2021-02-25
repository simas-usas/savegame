import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { map, slice } from 'lodash';

import AddButton from 'components/AddButton/AddButton';
import GameThumbnail from 'components/GameThumbnail/GameThumbnail';
import PlaceholderText from 'components/PlaceholderText/PlaceholderText';
import { FONT_COLOR } from 'styles/colors';

const { width, height } = Dimensions.get('window');

import data from '../../data';

const UserLists = ({ navigation, lists }) => {
  return (
    <>
      <ScrollView style={styles.scrollView}>
        {map(lists, list => (
          <View>
            <>
              <TouchableOpacity>
                <View style={styles.listContainer}>
                  <Text style={styles.listTitle}>{list.title}</Text>
                  <View style={styles.entriesContainer}>
                    {map(slice(list.entries, 0, 4), entry => (
                      <GameThumbnail data={data.find(item => item.id === entry)} />
                    ))}
                  </View>
                </View>
              </TouchableOpacity>
            </>
          </View>
        ))}
      </ScrollView>
      {!lists.length && <PlaceholderText text={'No lists created.'} />}
      <AddButton
        onPress={() =>
          navigation.navigate('AddList', {
            onPress: id => console.log(id),
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
  listContainer: {
    margin: width * 0.005,
  },
  listTitle: {
    color: FONT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 3,
  },
  entriesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

const mapStateToProps = ({ user: { lists } }) => ({
  lists,
});

export default connect(mapStateToProps)(UserLists);
