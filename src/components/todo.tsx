import * as React from 'react';
import * as Models from 'app/models';

interface TodoProps {
    todo: Models.Todo;
    onToggle?: (id: number) => void;
    onRemove?: (id: number) => void;
    onUpdate?: (id: number, oldValue: string, newValue: string) => void;
}

interface TodoState {
    editing: boolean;
}

export class Todo extends React.Component<TodoProps, TodoState> {

    constructor() {
        super();
        this.state = { editing: false };
    }

    public toggle(): void {
        if (this.props.onToggle)
            this.props.onToggle(this.props.todo.id);
    }

    public edit(): void {
        this.setState({ ...this.state, editing: !this.state.editing });
    }

    public remove(): void {
        if (this.props.onRemove)
            this.props.onRemove(this.props.todo.id);
    }

    public update(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Enter') {
            this.edit();
            if (this.props.onUpdate)
                this.props.onUpdate(this.props.todo.id, this.props.todo.text, event.currentTarget.value);
        }
        else if (event.key === 'Escape') {
            this.edit();
            event.currentTarget.value = this.props.todo.text;
        }
    }

    public render(): JSX.Element {
        return (
            <li className={(this.props.todo.completed ? 'completed' : '') + ' ' + (this.state.editing ? 'editing' : '')}>
                <div className="view">
                    <input className="toggle" type="checkbox" onClick={_ => this.toggle()} checked={this.props.todo.completed} />
                    <label onClick={_ => this.edit()}>{this.props.todo.text}</label>
                    <button className="destroy" onClick={_ => this.remove()}></button>
                </div>
                {this.state.editing &&
                    <input className="edit" defaultValue={this.props.todo.text} onKeyUp={event => this.update(event)} />
                }
            </li>
        );
    }
}
