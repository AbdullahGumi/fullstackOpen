import { createStore, combineReducers } from 'redux';
import anecdoteReducer from './reducers/anecdoteReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
})

export const store = createStore(
	reducer,
	composeWithDevTools()
);