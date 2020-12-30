import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { orderBy, map, filter, includes } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

const { width } = Dimensions.get('window');

import data from '../../data';

const getGamesByRating = ratings =>
  orderBy(
    filter(data, game =>
      includes(
        map(ratings, rating => rating.id),
        game.id,
      ),
    ),
    ['year'],
    ['desc'],
  );

const GameList = ({ navigation, ...props }) => {
  const { ratings } = props;
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.imageContainer}>
        {map(getGamesByRating(ratings), item => (
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

const mapStateToProps = ({ user: ratings }) => ({
  ratings,
});

export default connect(mapStateToProps)(GameList);
