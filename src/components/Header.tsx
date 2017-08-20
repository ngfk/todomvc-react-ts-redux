import * as React from 'react';

import { TodoTextInput } from './TodoTextInput';

export interface HeaderProps {
    addTodo: (text: string) => void;
}

export class Header extends React.Component<HeaderProps> {

    public render() {
        return (
            <header className='header'>
                <h1>todos</h1>
                <TodoTextInput
                    newTodo={true}
                    onSave={this.handleSave}
                    placeholder='What needs to be done?'
                />
            </header>
        );
    }

    private handleSave = (text: string) => {
        if (text.length !== 0)
            this.props.addTodo(text);
    }
}
