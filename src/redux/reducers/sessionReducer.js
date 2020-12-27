import { SET_GAME_SEARCH_INPUT } from '../actions/eventTypes';

const initialState = {
  searchInput: '',
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_SEARCH_INPUT:
      return { ...state, searchInput: action.payload };
    default:
      return state;
  }
};

export default sessionReducer;
