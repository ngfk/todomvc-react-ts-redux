import { combineReducers, createStore } from '@ailurus/ts-redux';
import * as Models from 'app/models';
import { FilterActions, filter } from './filter.state';
import { TodosState, TodosActions, todos } from './todos.state';

export * from './filter.state';
export * from './todos.state';

export interface State {
    readonly filter: Models.Filter;
    readonly todos: TodosState;
}

export interface Actions extends
    FilterActions, 
    TodosActions {}

export const reducer = combineReducers<State>({
    filter,
    todos
});

export const store = createStore<State, Actions>(reducer);
