import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { orderBy, map } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

const { width } = Dimensions.get('window');

import data from '../../data';

const GameList = ({ navigation }) => (
  <ScrollView
    contentInsetAdjustmentBehavior="automatic"
    style={styles.scrollView}
  >
    <View style={styles.imageContainer}>
      {map(orderBy(data, ['year'], ['desc']), (item) => (
        <GameThumbnail key={item.id} data={item} navigation={navigation} />
      ))}
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: width * 0.005,
  },
});

export default GameList;
