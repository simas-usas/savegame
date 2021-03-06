import React from 'react';
import { connect } from 'react-redux';
import { ScrollView, StyleSheet, View, Dimensions, Text } from 'react-native';
import { orderBy, map, filter, includes } from 'lodash';

import GameThumbnail from 'components/GameThumbnail/GameThumbnail';

import { PRIMARY_COLOR, FONT_COLOR } from 'styles/colors';
import data from '../../data';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const GameSearch = ({ navigation, searchInput, route }) => {
  const { onPress } = route.params;
  const gameList = searchInput
    ? filter(data, item => includes(item.title.toLowerCase(), searchInput.toLowerCase()))
    : [];

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
      <View style={styles.imageContainer}>
        {map(orderBy(gameList, ['year'], ['desc']), item => (
          <>
            <TouchableOpacity key={item.id} onPress={() => onPress(item.id)}>
              <View style={styles.itemContainer}>
                <GameThumbnail id={item.id} navigation={navigation} />
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

const mapStateToProps = ({ session: { searchInput } }) => ({
  searchInput,
});

export default connect(mapStateToProps)(GameSearch);
