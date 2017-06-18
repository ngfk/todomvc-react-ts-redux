import * as React from 'react';
import { Todo as TodoComponent } from 'app/components';
import { State, store } from 'app/states';
import { Todo, Filter} from 'app/models';

export class TodoApp extends React.Component<{}, State> {

    constructor() {
        super();
        this.state = store.getState();
        store.subscribe(() => this.setState(store.getState()));
    }

    public get activeCount(): number {
        return this.state.todos.filter(todo => !todo.completed).length
    }

    public get completedCount(): number {
        return this.state.todos.filter(todo => todo.completed).length
    }

    public addTodo(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key !== 'Enter')
            return;

        let input = event.currentTarget;
        store.action('TODO_ADD').dispatch({ text: input.value });
        input.value = '';
    }

    public filter(todos: Todo[]): Todo[] {
        switch (this.state.filter) {
            case Filter.Active:
                return todos.filter(todo => !todo.completed);
            case Filter.Completed:
                return todos.filter(todo => todo.completed);
            case Filter.All:
            default:
                return todos;
        }
    }

    public render(): JSX.Element {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <input className="new-todo"
                           placeholder="What needs to be done?"
                           onKeyPress={event => this.addTodo(event)}
                           autoFocus={true} />
                </header>
                {this.state.todos.length > 0 &&
                    <section className="main">
                        <input className="toggle-all"
                               type="checkbox"
                               defaultChecked={this.state.todos.every(todo => todo.completed)}
                               onClick={_ => store.action('TODO_TOGGLE').dispatch({ completed: !this.state.todos.every(todo => todo.completed) })} />
                        <label htmlFor="toggle-all">Mark all as complete</label>

                        <ul className="todo-list">
                            {this.filter(this.state.todos).map(todo => 
                                <TodoComponent key={todo.id}
                                               todo={todo}
                                               onToggle={id => store.action('TODO_TOGGLE').dispatch({ id })}
                                               onRemove={id => store.action('TODO_REMOVE').dispatch(id)} 
                                               onUpdate={(id, oldV, newV) => store.action('TODO_UPDATE').dispatch({ id, text: newV })} />
                            )}
                        </ul>
                    </section>
                }
                {this.state.todos.length > 0 &&
                    <footer className="footer">
                        <span className="todo-count"><strong>{this.activeCount}</strong> { this.activeCount == 1 ? 'item' : 'items' } left</span>
                        <ul className="filters">
                            <li><a href="#" className={this.state.filter === Filter.All       ? 'selected' : ''} onClick={_ => store.action('FILTER_SET').dispatch(Filter.All)}>All</a></li>
                            <li><a href="#" className={this.state.filter === Filter.Active    ? 'selected' : ''} onClick={_ => store.action('FILTER_SET').dispatch(Filter.Active)}>Active</a></li>
                            <li><a href="#" className={this.state.filter === Filter.Completed ? 'selected' : ''} onClick={_ => store.action('FILTER_SET').dispatch(Filter.Completed)}>Completed</a></li>
                        </ul>
                        {this.completedCount > 0 &&
                            <button className="clear-completed" onClick={_ => store.action('TODO_CLEAN').dispatch(undefined) }>Clear completed</button>
                        }
                    </footer>
                }
            </section>
        );
    }
}
