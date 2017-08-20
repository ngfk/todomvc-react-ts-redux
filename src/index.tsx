import 'todomvc-app-css/index.css';

import { createStore } from '@ngfk/ts-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { ActionMap } from './actions';
import { App } from './containers/App';
import { State } from './models/state';
import { registerServiceWorker } from './registerServiceWorker';
import { reducer } from './states';

export const store = createStore<State, ActionMap>(
    reducer,
    undefined as any,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
