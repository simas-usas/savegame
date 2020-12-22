import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from '../reducers/userReducer';
import sessionReducer from '../reducers/sessionReducer';

const rootReducer = combineReducers({
  user: userReducer,
  session: sessionReducer,
});

const configureStore = createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
