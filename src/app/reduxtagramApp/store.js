import { createStore, compose } from "redux";
import { syncHistoryWithStore } from 'react-router-redux';
import { createBrowserHistory } from 'history'

import rootReducer from './reducers/index';
import comments from './data/comments';
import posts from './data/posts';

const defaultState = { posts, comments };

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

export default store;