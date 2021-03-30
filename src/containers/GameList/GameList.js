import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { map } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

const { width, height } = Dimensions.get('window');

const GameList = ({ navigation, gameData, showRating }) => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.imageContainer}>
        {map(gameData, id => (
          <TouchableOpacity
            key={id}
            onPress={() =>
              navigation.navigate('GameProfile', {
                id,
              })
            }
          >
            <GameThumbnail id={id} navigation={navigation} showRating={showRating} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    height,
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
