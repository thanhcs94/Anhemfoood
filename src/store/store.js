import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducers from './reducer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

//logger: it will log state in console whenever you update store in debug mod
const store = createStore(reducers, applyMiddleware(sagaMiddleware, logger))

sagaMiddleware.run(rootSaga)

export default store