import * as React from 'react';
import * as classnames from 'classnames';

import { Filter } from '../models/filter';

export interface FooterProps {
    completedCount: number;
    activeCount: number;
    filter: string;
    onClearCompleted: () => void;
    onShow: (filter: Filter) => void;
}

export class Footer extends React.Component<FooterProps, {}> {

    public render() {
        const filters = Object.keys(Filter).map(key => Filter[key]).map(filter => (
            <li key={filter}>
                {this.renderFilterLink(filter)}
            </li>
        ));

        return (
            <footer className='footer'>
                {this.renderTodoCount()}
                <ul className='filters'>
                    {filters}
                </ul>
                {this.renderClearButton()}
            </footer>
        );
    }

    private renderTodoCount() {
        const { activeCount } = this.props;
        const itemWord = activeCount === 1 ? 'item' : 'items';

        return (
            <span className='todo-count'>
                <strong>{activeCount || 'No'}</strong> {itemWord} left
            </span>
        );
    }

    private renderFilterLink(filter: Filter) {
        const { filter: selectedFilter, onShow } = this.props;

        const classNames = classnames({ selected: filter === selectedFilter });
        const onClick = () => onShow(filter);

        return (
            <a className={classNames} style={{ cursor: 'pointer' }} onClick={onClick}>
                {filter}
            </a>
        );
    }

    private renderClearButton() {
        const { completedCount, onClearCompleted } = this.props;

        if (completedCount > 0) {
            return (
                <button className='clear-completed' onClick={onClearCompleted}>
                    Clear completed
                </button>
            );
        }

        return undefined;
    }
}
