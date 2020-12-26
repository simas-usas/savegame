import { SET_GAME_RATING, SET_GAME_REVIEW } from './eventTypes';

export const setGameRating = (payload) => ({ type: SET_GAME_RATING, payload });
export const setGameReview = (payload) => ({ type: SET_GAME_REVIEW, payload });
