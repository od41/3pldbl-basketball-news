import { CHANGE_SEARCH_FIELD, UPDATE_FEED} from './constants';
import { combineReducers } from '../../../../../AppData/Local/Microsoft/TypeScript/3.5/node_modules/redux';


const initialState = {
    searchInput: '',
    combinedFeed: []
}

export const grabCombinedFeed = (state=initialState, action={}) => {
    switch(action.type) {
        case UPDATE_FEED:
            return Object.assign({}, state, {combinedFeed: action.payload})
        default:
            return 'default'
    }
}

export const searchFeed = (state=initialState, action={}) => {
    switch(action.type) {
        case CHANGE_SEARCH_FIELD:
            return Object.assign({}, state, {searchInput: action.payload})
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    grabCombinedFeed, 
    searchFeed
})