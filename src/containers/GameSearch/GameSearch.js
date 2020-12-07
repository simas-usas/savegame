import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { orderBy, map, filter, includes } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

import data from '../../data';

const { width } = Dimensions.get('window');

const GameSearch = ({ navigation }) => {
  const searchInputValue = useSelector((state) => state.user.searchInput);
  const gameList = searchInputValue
    ? filter(data, (item) =>
        includes(item.title.toLowerCase(), searchInputValue.toLowerCase()),
      )
    : [];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.imageContainer}>
        {map(orderBy(gameList, ['year'], ['desc']), (item) => (
          <GameThumbnail key={item.id} data={item} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

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

export default GameSearch;
