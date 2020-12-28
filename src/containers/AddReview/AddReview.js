import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { find } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PRIMARY_COLOR, FONT_COLOR, ICON_COLOR, SECONDARY_COLOR } from '../../styles/colors';

const { width, height } = Dimensions.get('window');
const ratingOptions = [1, 2, 3, 4, 5];

const selectReviewById = (reviews, id) => find(reviews, review => review.id === id);

const selectRatingById = (ratings, id) => find(ratings, rating => rating.id === id);

const AddReview = ({ route, navigation, ...props }) => {
  const id = route.params.id;
  const { reviews, ratings } = props;
  const [reviewText, setReviewText] = useState('');
  const dispatch = useDispatch();

  const userReview = selectReviewById(reviews, id);
  const userRatingValue = selectRatingById(ratings, id) ? selectRatingById(ratings, id).rating : 0;

  useEffect(() => {
    if (userReview) {
      setReviewText(userReview.reviewText);
    } else {
      setReviewText('');
    }
  }, [userReview]);

  const onRate = rating => {
    dispatch({ type: 'SET_GAME_RATING', payload: { rating, id } });
  };

  const onSubmit = () => {
    dispatch({
      type: 'SET_GAME_REVIEW',
      payload: { id, reviewText },
    });
    setReviewText('');
    navigation.goBack();
  };

  return (
    <View style={styles.addReviewContainer}>
      <TextInput
        value={reviewText}
        onChangeText={e => setReviewText(e)}
        style={styles.textInput}
        placeholder="Add review..."
        placeholderTextColor={PRIMARY_COLOR}
        multiline
      />
      <View style={styles.buttonContainer}>
        <View style={styles.ratingsContainer}>
          {ratingOptions.map(rating => (
            <TouchableWithoutFeedback key={rating} onPress={() => onRate(rating)}>
              <Icon name="star" size={50} color={userRatingValue >= rating ? ICON_COLOR : SECONDARY_COLOR} solid />
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableOpacity
          disabled={!reviewText || !userRatingValue}
          onPress={() => onSubmit()}
          style={reviewText && userRatingValue ? styles.submitButton : styles.disabledSubmitButton}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const submitButtonStyle = {
  flex: 1,
  backgroundColor: ICON_COLOR,
  alignItems: 'center',
  justifyContent: 'center',
  width,
  height: height * 0.075,
};

const styles = StyleSheet.create({
  addReviewContainer: {
    flex: 1,
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  textInput: {
    width: width * 0.95,
    fontSize: 18,
    color: FONT_COLOR,
  },
  ratingsContainer: {
    width,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  submitButton: {
    ...submitButtonStyle,
  },
  disabledSubmitButton: {
    ...submitButtonStyle,
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

const mapStateToProps = ({ user }) => {
  return {
    ratings: user.ratings,
    reviews: user.reviews,
  };
};

export default connect(mapStateToProps)(AddReview);
