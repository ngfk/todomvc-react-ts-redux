import { createReducer } from '@ngfk/ts-redux';

import { TodoActionMap } from '../actions/todos.actions';
import { Todo } from '../models/todo';

const initial: Todo[] = [
    { id: 0, text: 'User Redux', completed: false }
];

export const todosReducer = createReducer<Todo[], TodoActionMap>(initial, {
    TODO_ADD: (state, payload) => {
        return [
            {
                id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
                text: payload,
                completed: false,
            },
            ...state,
        ];
    },
    TODO_DELETE: (state, payload) => {
        return state.filter(todo => todo.id !== payload);
    },
    TODO_EDIT: (state, payload) => {
        return state.map(todo => todo.id === payload.id
            ? { ...todo, text: payload.text }
            : todo
        );
    },
    TODO_COMPLETE: (state, payload) => {
        return state.map(todo => todo.id === payload
            ? { ...todo, completed: !todo.completed }
            : todo
        );
    },
    TODO_COMPLETE_ALL: (state, payload) => {
        const areAllCompleted = state.every(todo => todo.completed);
        return state.map(todo => ({
            ...todo,
            completed: !areAllCompleted
        }));
    },
    TODO_CLEAR: (state, payload) => {
        return state.filter(todo => !todo.completed);
    },
});
