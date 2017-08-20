import * as classnames from 'classnames';
import * as React from 'react';

import { Todo } from '../models/todo';
import { TodoTextInput } from './TodoTextInput';

export interface TodoItemProps {
    todo: Todo;
    editTodo: (payload: { id: number, text: string }) => void;
    deleteTodo: (id: number) => void;
    completeTodo: (id: number) => void;
}

export interface TodoItemState {
    editing: boolean;
}

export class TodoItem extends React.Component<TodoItemProps, TodoItemState> {

    constructor() {
        super();
        this.state = {
            editing: false
        };
    }

    public render() {
        const { todo } = this.props;
        const completeTodo = () => this.props.completeTodo(todo.id);
        const deleteTodo   = () => this.props.deleteTodo(todo.id);
        const handleSave   = (text: string) => this.handleSave(todo.id, text);

        let element;
        if (this.state.editing) {
            element = (
                <TodoTextInput
                    text={todo.text}
                    editing={this.state.editing}
                    onSave={handleSave}
                />
            );
        }
        else {
            element = (
                <div className='view'>
                    <input
                        className='toggle'
                        type='checkbox'
                        checked={todo.completed}
                        onChange={completeTodo}
                    />
                    <label onDoubleClick={this.handleDoubleClick}>
                        {todo.text}
                    </label>
                    <button className='destroy' onClick={deleteTodo} />
                </div>
            );
        }

        const classNames = classnames({
            completed: todo.completed,
            editing: this.state.editing
        });

        return (
            <li className={classNames}>
                {element}
            </li>
        );
    }

    private handleDoubleClick = () => {
        this.setState({ editing: true });
    }

    private handleSave = (id: number, text: string) => {
        if (text.length === 0)
            this.props.deleteTodo(id);
        else
            this.props.editTodo({ id, text });

        this.setState({ editing: false });
    }
}
