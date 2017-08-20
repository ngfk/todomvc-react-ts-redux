import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ActionCreators, actionCreators } from '../actions';
import { Header } from '../components/Header';
import { MainSection } from '../components/MainSection';
import { State } from '../models/state';
import { Todo } from '../models/todo';

interface AppProps {
    todos: Todo[];
    actions: ActionCreators;
}

const app: React.StatelessComponent<AppProps> = ({ todos, actions }) => {
    const { addTodo } = actions;

    return (
        <section className='todoapp'>
            <Header addTodo={addTodo} />
            <MainSection todos={todos} actions={actions} />
        </section>
    );
};

const mapStateToProps = (state: State) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

// tslint:disable-next-line variable-name
export const App = connect(mapStateToProps, mapDispatchToProps)(app);
