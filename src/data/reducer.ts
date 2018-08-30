import { combineReducers } from 'redux'
import { State } from 'models/State'
import { moviesReducer, moviesInitState } from './modules/movies'

export const initState = {
  movies: moviesInitState,
}

export const reducer = combineReducers<State>({
  movies: moviesReducer,
})
