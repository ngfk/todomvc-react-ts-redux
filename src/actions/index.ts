import { filterActionCreators, FilterActionCreators, FilterActionMap } from './filter.actions';
import { todoActionCreators, TodoActionCreators, TodoActionMap } from './todos.actions';

export interface ActionMap extends
    TodoActionMap,
    FilterActionMap { }

export const actionCreators = {
    ...filterActionCreators,
    ...todoActionCreators,
};

export type ActionCreators = TodoActionCreators & FilterActionCreators;
