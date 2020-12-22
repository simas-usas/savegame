import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { orderBy, map, filter, includes } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

const { width } = Dimensions.get('window');

import data from '../../data';

const GameList = ({ navigation }) => {
  const userRatings = useSelector((state) =>
    map(state.user.ratings, (item) => item.id),
  );
  const gameList = filter(data, (item) => includes(userRatings, item.id));
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}
    >
      <View style={styles.imageContainer}>
        {map(orderBy(gameList, ['year'], ['desc']), (item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate('GameProfile', {
                id: item.id,
              })
            }
          >
            <GameThumbnail data={item} navigation={navigation} showRating />
          </TouchableOpacity>
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

export default GameList;
