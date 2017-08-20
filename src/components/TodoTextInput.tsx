import * as classnames from 'classnames';
import * as React from 'react';

export interface TodoTextInputProps {
    onSave: (text: string) => void;
    text?: string;
    placeholder?: string;
    editing?: boolean;
    newTodo?: boolean;
}

export interface TodoTextInputState {
    text?: string;
}

export class TodoTextInput extends React.Component<TodoTextInputProps, TodoTextInputState> {

    constructor() {
        super();
        this.state = {
            text: this.props ? this.props.text : ''
        };
    }

    public render() {
        const classNames = classnames({
            'edit': this.props.editing,
            'new-todo': this.props.newTodo
        });

        return (
            <input
                className={classNames}
                type='text'
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit}
            />
        );
    }

    private handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo)
                this.setState({ text: '' });
        }
    }

    private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: e.target.value });
    }

    private handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!this.props.newTodo)
            this.props.onSave(e.currentTarget.value);
    }
}
