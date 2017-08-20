import { ActionFactory } from '@ngfk/ts-redux';

import { Filter } from '../models/filter';

export interface FilterActionMap {
    'FILTER_SET': Filter;
}

const factory = new ActionFactory<FilterActionMap>();

export const filterActionCreators = {
    setFilter: factory.creator('FILTER_SET')
};

export type FilterActionCreators = typeof filterActionCreators;
