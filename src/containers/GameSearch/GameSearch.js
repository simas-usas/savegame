import React from 'react';
import { ScrollView, StyleSheet, View, Dimensions, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { orderBy, map, filter, includes } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

import { PRIMARY_COLOR, FONT_COLOR } from '../../styles/colors';
import data from '../../data';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const GameSearch = ({ navigation }) => {
  const searchInputValue = useSelector(state => state.session.searchInput);
  const gameList = searchInputValue
    ? filter(data, item => includes(item.title.toLowerCase(), searchInputValue.toLowerCase()))
    : [];

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.imageContainer}>
        {map(orderBy(gameList, ['year'], ['desc']), item => (
          <>
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('GameProfile', {
                  id: item.id,
                })
              }
            >
              <View style={styles.itemContainer}>
                <GameThumbnail data={item} navigation={navigation} />
                <View style={styles.textContainer}>
                  <Text style={styles.titleText}>{item.title}</Text>
                  <Text style={styles.yearText}>{item.year}</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.itemBorder} />
          </>
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
    flexDirection: 'column',
    flexWrap: 'wrap',
    margin: width * 0.005,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: height * 0.0125,
    marginHorizontal: width * 0.025,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    color: FONT_COLOR,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  yearText: {
    color: FONT_COLOR,
    fontSize: 14,
    marginLeft: 10,
  },
  itemBorder: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    width: width * 0.95,
    marginHorizontal: width * 0.025,
  },
});

export default GameSearch;
