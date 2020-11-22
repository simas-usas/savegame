import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import data from '../../data';

const { width, height } = Dimensions.get('window');

const selectRatingById = (state, id) => {
  return state.user.ratings.find((rating) => rating.id === id);
};

const GameProfile = ({ route }) => {
  const id = route.params.id;
  const game = data.find((item) => item.id === id);
  const userRating = useSelector((state) => selectRatingById(state, id));

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
      <View>
        <Text style={styles.defaultText}>
          {userRating ? userRating.rating : 0}
        </Text>
      </View>
      <View>
        <Button title="1" color="#6b7f99" onPress={() => onRate(1)} />
        <Button title="2" color="#6b7f99" onPress={() => onRate(2)} />
        <Button title="3" color="#6b7f99" onPress={() => onRate(3)} />
        <Button title="4" color="#6b7f99" onPress={() => onRate(4)} />
        <Button title="5" color="#6b7f99" onPress={() => onRate(5)} />
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
