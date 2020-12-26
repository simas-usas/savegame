import { SET_GAME_SEARCH_INPUT, SET_ADD_REVIEW_INPUT } from './eventTypes';

export const setGameSearchInput = (payload) => ({
  type: SET_GAME_SEARCH_INPUT,
  payload,
});

export const setAddReviewText = (payload) => ({
  type: SET_ADD_REVIEW_INPUT,
  payload,
});
