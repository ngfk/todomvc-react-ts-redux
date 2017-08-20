import { Filter } from './filter';
import { Todo } from './todo';

export interface State {
    readonly todos: Todo[];
    readonly filter: Filter;
}
