import { createReducer, ReducerBuilder } from '@ailurus/ts-redux';
import { Todo } from 'app/models';

export interface TodoActions {
    'TODO_ADD': { id: number, text: string };
    'TODO_REMOVE': number;
    'TODO_TOGGLE': { id?: number, completed?: boolean };
    'TODO_UPDATE': { id: number, text: string };
    'TODO_CLEAN': undefined;
}

export const todo = new ReducerBuilder<Todo, TodoActions>()
    .case('TODO_ADD', (state, payload) => ({
        id: payload.id,
        text: payload.text,
        completed: false,
        editing: false
    }))
    .case('TODO_TOGGLE', (state, payload) => {
        let completed = payload.completed !== undefined
            ? payload.completed
            : !state.completed;

        let apply = payload.id !== undefined
            ? state.id === payload.id
            : true;

        return {
            ...state,
            completed: apply ? completed : state.completed
        }
    })
    .case('TODO_UPDATE', (state, payload) => ({
        ...state,
        text: payload.id === state.id ? payload.text : state.text
    }))
    .build();

export const todos = createReducer<Todo[], TodoActions>([], {
    TODO_ADD: (state, payload, action) => [
        ...state,
        todo({} as Todo, action)
    ],
    TODO_REMOVE: (state, payload) => {
        return state.filter(todo => todo.id !== payload);
    },
    TODO_TOGGLE: (state, payload, action) => {
        return state.map(t => todo(t, action));
    },
    TODO_UPDATE: (state, payload, action) => {
        return state.map(t => todo(t, action));
    },
    TODO_CLEAN: (state, payload) => {
        return state.filter(todo => !todo.completed);
    }
});
