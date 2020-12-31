import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
  const { id } = route.params;
  const { reviews, ratings, setGameRating, setGameReview } = props;
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState('');

  const userReview = selectReviewById(reviews, id);
  const userRatingValue = selectRatingById(ratings, id) ? selectRatingById(ratings, id).rating : 0;

  useEffect(() => {
    if (userRatingValue) {
      setRating(userRatingValue);
    } else {
      setRating(0);
    }
    if (userReview) {
      setReviewText(userReview.reviewText);
    } else {
      setReviewText('');
    }
  }, [userReview, userRatingValue]);

  const onSubmit = () => {
    setGameRating(rating, id);
    if (reviewText) {
      setGameReview(reviewText, id);
      setReviewText('');
    }
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
          {ratingOptions.map(item => (
            <TouchableWithoutFeedback key={item} onPress={() => setRating(item)}>
              <Icon name="star" size={50} color={rating >= item ? ICON_COLOR : SECONDARY_COLOR} solid />
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableOpacity
          disabled={!rating}
          onPress={() => onSubmit()}
          style={!rating ? styles.submitButton : styles.disabledSubmitButton}
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

const mapStateToProps = ({ user: { ratings, reviews } }) => ({
  ratings,
  reviews,
});

const mapDispatchToProps = dispatch => ({
  setGameRating: (rating, id) => dispatch({ type: 'SET_GAME_RATING', payload: { rating, id } }),
  setGameReview: (reviewText, id) => dispatch({ type: 'SET_GAME_REVIEW', payload: { reviewText, id } }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
