import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import data from '../../data';

const { width, height } = Dimensions.get('window');

const selectRatingById = (state, id) => {
  return state.user.ratings.find((rating) => rating.id === id);
};

const ratingOptions = [1, 2, 3, 4, 5];

const GameProfile = ({ route }) => {
  const id = route.params.id;
  const game = data.find((item) => item.id === id);
  const userRating = useSelector((state) => selectRatingById(state, id));
  const userRatingValue = userRating ? userRating.rating : 0

  const dispatch = useDispatch();

  const onRate = (rating) => {
    dispatch({ type: 'SET_GAME_RATING', payload: { rating, id } });
  };

  return (
    <View>
      <View style={styles.gameProfile}>
        <View style={styles.imageContainer}>
          <Image source={game.image} style={styles.image} />
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{game.title}</Text>
          <Text style={styles.year}>({game.year})</Text>
          <View style={styles.developerContainer}>
            <Text style={styles.defaultText}>Developed by</Text>
            <Text style={styles.developer}>{game.developer}</Text>
          </View>
        </View>
      </View>
      <View style={styles.ratingsContainer}>
        {ratingOptions.map((rating) => (
          <TouchableWithoutFeedback key={rating} onPress={() => onRate(rating)}>
            <Icon
              name="star"
              size={50}
              color="#6b7f99"
              solid={userRatingValue >= rating}
            />
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameProfile: {
    flexDirection: 'row',
    margin: height * 0.025,
  },
  imageContainer: {
    width: width * 0.3,
    height: height * 0.21,
  },
  detailsContainer: {
    marginLeft: '5%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  developerContainer: {
    marginTop: '7.5%',
  },
  ratingsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: '#6b7f99',
  },
  defaultText: {
    color: '#b6c5d9',
    fontSize: 16,
  },
  title: {
    color: '#b6c5d9',
    fontSize: 30,
    fontWeight: 'bold',
  },
  year: {
    color: '#b6c5d9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  developer: {
    color: '#b6c5d9',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameProfile;
