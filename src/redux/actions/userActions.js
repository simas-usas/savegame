import { SET_GAME_RATING, SET_GAME_REVIEW, SET_USER_LIST, UPDATE_BACKLOG } from './eventTypes';

export const setGameRating = payload => ({ type: SET_GAME_RATING, payload });
export const setGameReview = payload => ({ type: SET_GAME_REVIEW, payload });
export const setUserList = payload => ({ type: SET_USER_LIST, payload });
export const updateBacklog = payload => ({ type: UPDATE_BACKLOG, payload });
