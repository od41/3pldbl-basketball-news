import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_FEED_PENDING,
    REQUEST_ESPN_FEED_SUCCESS,
    REQUEST_EUROLEAGUE_FEED_SUCCESS,
    REQUEST_TALKBASKET_FEED_SUCCESS,
    REQUEST_FEED_FAILED
} from './constants';

import { combineReducers } from 'redux';

const initialStateFeed = {
    isPending: false,
    espnFeed: [],
    euroleagueFeed: [],
    talkbasketFeed: [],
    error: ''
}

export const requestFeed = (state=initialStateFeed, action={}) => {
    switch(action.type) {
        case REQUEST_FEED_PENDING:
            return Object.assign({}, state, {isPending: true})
        
        case REQUEST_ESPN_FEED_SUCCESS:
            return Object.assign({}, state, {espnFeed: action.payload, isPending: false})

        case REQUEST_EUROLEAGUE_FEED_SUCCESS:
            return Object.assign({}, state, {euroleagueFeed: action.payload, isPending: false})

        case REQUEST_TALKBASKET_FEED_SUCCESS:
            return Object.assign({}, state, {talkbasketFeed: action.payload, isPending: false})    
        
        case REQUEST_FEED_FAILED:
            return Object.assign({}, state, {error: action.payload, isPending: true})
        
        default:
            return state;
    }
}

const initialStateSearch = {
    searchInput: ''
}

export const searchFeed = (state=initialStateSearch, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchInput: action.payload})
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    requestFeed, 
    searchFeed
})