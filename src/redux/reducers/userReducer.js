import { map, indexOf } from 'lodash';

import { SET_GAME_RATING } from '../actions/eventTypes';

const initialState = {
  ratings: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_RATING:
      const index = indexOf(
        map(state.ratings, (rating) => rating.id),
        action.payload.id,
      );
      if (index >= 0) {
        state.ratings.splice(index, 1, action.payload);
        return {
          ...state,
        };
      } else {
        return { ...state, ratings: [...state.ratings, action.payload] };
      }
    default:
      return state;
  }
};

export default userReducer;
