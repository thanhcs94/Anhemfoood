import { combineReducers } from 'redux'
import { ActionNames } from './actions'
import ImmutableJS from 'immutable'

const userReducer = (state=ImmutableJS.fromJS({}), action) => {
    if (action.type === ActionNames.UPDATE_USER) {
        return ImmutableJS.fromJS(action.user)
    }

    return state
}

const postsReducer = (state=ImmutableJS.fromJS([]), action) => {
    if (action.type === ActionNames.POSTLIST) {
        return ImmutableJS.fromJS(action.posts)
    }

    return state
}

const reducers = combineReducers({
    user: userReducer,
    postList: postsReducer
})

export default reducers