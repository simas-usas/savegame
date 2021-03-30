import React, { useState } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Dimensions, Image, Text, ImageBackground } from 'react-native';
import { map, filter, find, fill } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import { PRIMARY_COLOR, SECONDARY_COLOR, SECONDARY_COLOR_TRANSPARENT, FONT_COLOR } from 'styles/colors';
import AddButton from 'components/AddButton/AddButton';
import LogModal from 'components/LogModal/LogModal';

import data, { user as userData } from '../../data';

const { width, height } = Dimensions.get('window');

const selectRatingById = (ratings, id) => {
  const ratingObject = find(ratings, rating => rating.id === id);
  return ratingObject && ratingObject.rating;
};

const selectReviewById = (reviews, id) =>
  map(
    filter(reviews, review => review.id === id),
    item => item.reviewText,
  );

const GameProfile = ({ route, navigation, ...props }) => {
  const { id } = route.params;
  const { reviews, ratings } = props;
  const game = data.find(item => item.id === id);

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <ImageBackground
        source={game.background}
        style={styles.backgroundImageContainer}
        imageStyle={styles.backgroundImage}
      >
        <LinearGradient colors={[SECONDARY_COLOR_TRANSPARENT, SECONDARY_COLOR]} locations={[0, 0.75]}>
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
        </LinearGradient>
      </ImageBackground>
      <View>
        <View style={styles.reviewHeaderContainer}>
          <Text style={styles.reviewHeaderText}>REVIEWS</Text>
        </View>
        <View style={styles.reviewsContainer}>
          {map(selectReviewById(reviews, id), review => (
            <View style={styles.reviewContainer}>
              <View style={styles.avatarAndRatingContainer}>
                <View style={styles.userAvatarContainer}>
                  <Image source={userData.avatar} style={styles.userAvatar} />
                </View>
                <View style={styles.ratingContainer}>
                  {selectRatingById(ratings, id) &&
                    fill(
                      Array(selectRatingById(ratings, id)),
                      <View style={styles.icon}>
                        <Icon name="star" color={FONT_COLOR} solid size={9} />
                      </View>,
                    )}
                </View>
              </View>
              <View>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text key={review} style={styles.reviewText}>
                  {review}
                </Text>
                <View style={styles.reviewBorder} />
              </View>
            </View>
          ))}
        </View>
      </View>
      <AddButton onPress={() => setModalVisible(true)} />
      <LogModal navigation={navigation} id={id} visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  gameProfile: {
    flexDirection: 'row',
    marginTop: height * 0.125,
    marginHorizontal: height * 0.025,
    marginBottom: height * 0.025,
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
  backgroundImageContainer: {
    width,
  },
  backgroundImage: {
    marginTop: -(height * 0.05),
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    display: 'flex',
    alignItems: 'flex-end',
    marginRight: width * 0.05,
    marginBottom: width * 0.05,
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
  },
  defaultText: {
    color: FONT_COLOR,
    fontSize: 16,
  },
  title: {
    color: FONT_COLOR,
    fontSize: 30,
    fontWeight: 'bold',
  },
  year: {
    color: FONT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  developer: {
    color: FONT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewHeaderContainer: {
    alignItems: 'center',
    borderTopColor: PRIMARY_COLOR,
    borderTopWidth: 1,
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    marginBottom: width * 0.05,
  },
  reviewHeaderText: {
    color: FONT_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  reviewsContainer: {
    flexDirection: 'column',
  },
  reviewContainer: {
    flexDirection: 'row',
    marginBottom: width * 0.05,
    width: width * 0.65,
  },
  avatarAndRatingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: width * 0.25,
  },
  userAvatarContainer: {
    width: width * 0.1375,
    height: width * 0.1375,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    borderRadius: width / 2,
    marginBottom: 7.5,
  },
  userAvatar: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    borderRadius: width / 2,
  },
  userName: {
    color: PRIMARY_COLOR,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewText: {
    color: FONT_COLOR,
    fontSize: 16,
    marginVertical: width * 0.05,
  },
  reviewBorder: {
    borderBottomColor: PRIMARY_COLOR,
    borderBottomWidth: 1,
    width: width * 0.7,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
});

const mapStateToProps = ({ user: { ratings, reviews } }) => ({
  ratings,
  reviews,
});

export default connect(mapStateToProps)(GameProfile);
