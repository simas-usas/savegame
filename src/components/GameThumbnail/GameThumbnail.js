import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { fill } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PRIMARY_COLOR, FONT_COLOR } from '../../styles/colors';

const { height, width } = Dimensions.get('window');

const GameThumbnail = ({ data, rating }) => (
  <>
    <View style={styles.imageContainer}>
      <Image source={data.image} style={styles.image} />
    </View>
    {rating && (
      <View style={styles.ratingContainer}>
        {fill(
          Array(rating),
          <View style={styles.icon}>
            <Icon name="star" color={FONT_COLOR} solid size={9} />
          </View>,
        )}
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'column',
    width: width * 0.2375,
    height: height * 0.16,
    margin: width * 0.005,
  },
  ratingContainer: {
    flexDirection: 'row',
    width: width * 0.2375,
    marginTop: 2,
    marginBottom: 4,
    marginHorizontal: width * 0.005,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  icon: {
    marginHorizontal: 0.75,
  },
});

export default GameThumbnail;
