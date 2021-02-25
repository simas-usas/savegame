import { map, indexOf } from 'lodash';

import { SET_GAME_RATING, SET_GAME_REVIEW, SET_USER_LIST } from '../actions/eventTypes';

const initialState = {
  ratings: [],
  reviews: [],
  lists: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_RATING:
      const ratingIndex = indexOf(
        map(state.ratings, rating => rating.id),
        action.payload.id,
      );
      if (ratingIndex >= 0) {
        state.ratings.splice(ratingIndex, 1, action.payload);
        return {
          ...state,
        };
      } else {
        return { ...state, ratings: [...state.ratings, action.payload] };
      }
    case SET_GAME_REVIEW: {
      const reviewIndex = indexOf(
        map(state.reviews, rating => rating.id),
        action.payload.id,
      );
      if (reviewIndex >= 0) {
        state.reviews.splice(reviewIndex, 1, action.payload);
        return {
          ...state,
        };
      } else {
        return { ...state, reviews: [...state.reviews, action.payload] };
      }
    }
    case SET_USER_LIST: {
      return { ...state, lists: [...state.lists, action.payload] };
    }
    default:
      return state;
  }
};

export default userReducer;
