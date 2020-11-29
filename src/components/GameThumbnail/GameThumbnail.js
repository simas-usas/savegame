import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { PRIMARY_COLOR } from '../../styles/colors';

const { height, width } = Dimensions.get('window');

const GameThumbnail = ({ data, navigation }) => (
  <TouchableOpacity
    onPress={() =>
      navigation.navigate('GameProfile', {
        id: data.id,
      })
    }
  >
    <View style={styles.imageContainer}>
      <Image source={data.image} style={styles.image} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'column',
    width: width * 0.2375,
    height: height * 0.16,
    margin: width * 0.005,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
});

export default GameThumbnail;
