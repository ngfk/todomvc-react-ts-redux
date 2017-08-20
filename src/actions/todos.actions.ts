import { ActionFactory } from '@ngfk/ts-redux';

export interface TodoActionMap {
    TODO_ADD: string;
    TODO_DELETE: number;
    TODO_EDIT: { id: number, text: string };
    TODO_COMPLETE: number;
    TODO_COMPLETE_ALL: undefined;
    TODO_CLEAR: undefined;
}

const actionFactory = new ActionFactory<TodoActionMap>();

export const todoActionCreators = {
    addTodo: actionFactory.creator('TODO_ADD'),
    deleteTodo: actionFactory.creator('TODO_DELETE'),
    editTodo: actionFactory.creator('TODO_EDIT'),
    completeTodo: actionFactory.creator('TODO_COMPLETE'),
    completeAllTodos: actionFactory.creator('TODO_COMPLETE_ALL'),
    clearTodos: actionFactory.creator('TODO_CLEAR'),
};

export type TodoActionCreators = typeof todoActionCreators;
