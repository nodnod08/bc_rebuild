import { createStore, applyMiddleware } from 'redux'
import combineReducers from './reducers'
import thunk from 'redux-thunk'

const initialState = {}

const middleWare = [thunk]

const store = createStore(combineReducers, initialState, applyMiddleware(...middleWare)) 

export default store