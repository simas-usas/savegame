import {
  SET_GAME_SEARCH_INPUT,
  SET_ADD_REVIEW_INPUT,
} from '../actions/eventTypes';

const initialState = {
  searchInput: '',
  addReviewInput: '',
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };
    case SET_ADD_REVIEW_INPUT:
      return { ...state, addReviewInput: action.payload };
    default:
      return state;
  }
};

export default sessionReducer;
