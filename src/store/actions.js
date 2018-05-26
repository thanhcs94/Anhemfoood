export const ActionNames = {
    UPDATE_USER: 'UPDATE_USER',
    STORE_USER: 'STORE_USER',
    LOGOUT: 'LOG_OUT',
    POSTLIST: 'POST_LIST'
}


const Actions = {
    updateUser (user) {
        return {
            type: ActionNames.UPDATE_USER,
            user
        }
    },
    storeUser (user) {
        return {
            type: ActionNames.STORE_USER,
            user
        }
    },
    logout () {
        return {
            type: ActionNames.LOGOUT
        }
    },
    updatePostList (posts) {
        return {
            type: ActionNames.POSTLIST,
            posts
        }
    }
}


export default Actions