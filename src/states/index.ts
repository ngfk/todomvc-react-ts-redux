import { combineReducers } from 'redux';

import { State } from '../models/state';
import { filterReducer } from './filter.reducer';
import { todosReducer } from './todos.reducer';

export const reducer = combineReducers<State>({
    todos: todosReducer,
    filter: filterReducer,
});
