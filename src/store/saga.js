import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ActionNames } from './actions'
import { AsyncStorage } from 'react-native'

async function storeUser (action) {
    try {
        delete action.user.password
        await AsyncStorage.setItem('kidground::user', JSON.stringify(action.user))
    } catch (ex) {
        console.log(ex)
    }
}

async function removeUser (action) {
    try {
        await AsyncStorage.removeItem('kidground::user')
    } catch (ex) {
        console.log(ex)
    }
}

export default function* rootSaga() {
    yield takeEvery(ActionNames.STORE_USER, storeUser)
    yield takeEvery(ActionNames.LOGOUT, removeUser)
}