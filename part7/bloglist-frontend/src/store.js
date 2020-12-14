import { createStore, combineReducers, applyMiddleware } from 'redux';
import notificationReducer from './reducers/notificationReducer';
import userReducer from './reducers/userReducer';
import blogsReducer from './reducers/blogsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'
const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogsReducer
})

export const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk))
);