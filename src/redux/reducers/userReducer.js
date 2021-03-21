import { SET_GAME_RATING, SET_GAME_REVIEW, SET_USER_LIST } from '../actions/eventTypes';

const initialState = {
  ratings: [],
  reviews: [],
  lists: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_RATING:
      const ratings = new Set(state.ratings);
      ratings.add(action.payload);
      return { ...state, ratings: Array.from(ratings) };
    case SET_GAME_REVIEW: {
      const reviews = new Set(state.reviews);
      reviews.add(action.payload);
      return { ...state, reviews: Array.from(reviews) };
    }
    case SET_USER_LIST: {
      return { ...state, lists: [...state.lists, action.payload] };
    }
    default:
      return state;
  }
};

export default userReducer;
