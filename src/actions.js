import { CHANGE_SEARCH_FIELD, UPDATE_FEED} from './constants';

export const setRssFeed = (rssFeedArray) => ({
    type: UPDATE_FEED,
    payload: rssFeedArray
});

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});