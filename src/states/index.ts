import { combineReducers, createStore } from '@ailurus/ts-redux';
import { Filter, Todo } from 'app/models';
import { FilterActions, filter } from './filter.state';
import { TodoActions, todos } from './todo.state';

export * from './filter.state';
export * from './todo.state';

export interface State {
    readonly filter: Filter;
    readonly todos: Todo[];
}

export interface Actions extends
    FilterActions, 
    TodoActions {}

export const reducer = combineReducers<State>({
    filter,
    todos
});

export const store = createStore<State, Actions>(
    reducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
