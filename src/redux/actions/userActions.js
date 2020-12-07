import { SET_GAME_RATING, SET_GAME_SEARCH_INPUT } from './eventTypes';

export const setGameRating = (payload) => ({ type: SET_GAME_RATING, payload });
export const setGameSearchInput = (payload) => ({ type: SET_GAME_SEARCH_INPUT, payload });
