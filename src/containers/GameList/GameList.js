import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { orderBy, map, filter, includes } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

const { width } = Dimensions.get('window');

import data from '../../data';

const getRatedGames = ratings =>
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

const getGameRating = (ratings, id) => ratings.find(rating => rating.id === id);

const GameList = ({ navigation, ...props }) => {
  const { ratings } = props;
  const [userRatings, setUserRatings] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setUserRatings(ratings);
    }
  }, [isFocused, ratings]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.imageContainer}>
        {map(getRatedGames(userRatings), item => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate('GameProfile', {
                id: item.id,
              })
            }
          >
            <GameThumbnail data={item} navigation={navigation} rating={getGameRating(userRatings, item.id).rating} />
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

const mapStateToProps = ({ user: { ratings } }) => ({
  ratings,
});

export default connect(mapStateToProps)(GameList);
