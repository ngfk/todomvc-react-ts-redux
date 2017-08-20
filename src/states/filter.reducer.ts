import { createReducer } from '@ngfk/ts-redux';

import { FilterActionMap } from '../actions/filter.actions';
import { Filter } from '../models/filter';

export const filterReducer = createReducer<Filter, FilterActionMap>(Filter.All, {
    'FILTER_SET': (state, payload) => payload,
});
