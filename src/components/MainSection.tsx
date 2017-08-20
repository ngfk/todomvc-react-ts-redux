import * as React from 'react';

import { TodoActionCreators } from '../actions/todos.actions';
import { Filter } from '../models/filter';
import { Todo } from '../models/todo';
import { Footer } from './Footer';
import { TodoItem } from './TodoItem';

export interface MainSectionProps {
    todos: Todo[];
    actions: TodoActionCreators;
}

export interface MainSectionState {
    filter: Filter;
}

export class MainSection extends React.Component<MainSectionProps, MainSectionState> {

    constructor() {
        super();
        this.state = {
            filter: Filter.All
        };
    }

    public render() {
        const { todos, actions } = this.props;
        const { filter } = this.state;

        const filteredTodos = this.filterTodos(todos, filter);
        const completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);

        const todoItems = filteredTodos.map(todo => {
            const { editTodo, completeTodo } = actions;

            return (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editTodo={editTodo}
                    completeTodo={completeTodo}
                    deleteTodo={completeTodo}
                />
            );
        });

        return (
            <section className='main'>
                {this.renderToggleAll(completedCount)}
                <ul className='todo-list'>
                    {todoItems}
                </ul>
                {this.renderFooter(completedCount)}
            </section>
        );
    }

    private filterTodos = (todos: Todo[], filter: Filter) => {
        switch (filter) {
            case Filter.All:
                return todos;
            case Filter.Active:
                return todos.filter(todo => !todo.completed);
            case Filter.Completed:
                return todos.filter(todo => todo.completed);
        }
    }

    private handleClearCompleted = () => {
        this.props.actions.clearTodos(undefined);
    }

    private handleShow = (filter: Filter) => {
        this.setState({ filter });
    }

    private renderToggleAll = (completedCount: number) => {
        const { todos, actions } = this.props;
        const completeAllTodos = () => actions.completeAllTodos(undefined);

        if (todos.length > 0) {
            return (
                <div>
                    <input
                        className='toggle-all'
                        type='checkbox'
                        checked={completedCount === todos.length}
                        onChange={completeAllTodos}
                    />
                    <label htmlFor='toggle-all'>Mark all as complete</label>
                </div>
            );
        }

        return undefined;
    }

    private renderFooter = (completedCount: number) => {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if (todos.length) {
            return (
                <Footer
                    completedCount={completedCount}
                    activeCount={activeCount}
                    filter={filter}
                    onClearCompleted={this.handleClearCompleted}
                    onShow={this.handleShow}
                />
            );
        }

        return undefined;
    }
}
