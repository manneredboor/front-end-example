import fetch from 'isomorphic-fetch'
import { Reducer, Action, ActionCreator } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { Movie } from 'models/Movie'
import { MoviesState } from 'models/MoviesState'
import { State } from 'models/State'

const fetchUrl = 'https://tender-mclean-00a2bd.netlify.com/web/movies.json'

const FETCH_MOVIES = 'FETCH_MOVIES'
const RECIEVE_MOVIES = 'RECIEVE_MOVIES'

type FetchMoviesAction = Action<'FETCH_MOVIES'>
type RecieveMoviesAction = Action<'RECIEVE_MOVIES'> & { payload: Movie[] }

type Actions = FetchMoviesAction | RecieveMoviesAction

const startFetchMovies: ActionCreator<FetchMoviesAction> = () => ({
  type: FETCH_MOVIES,
})

const recieveMovies: ActionCreator<RecieveMoviesAction> = (
  payload: Movie[],
) => ({
  payload,
  type: RECIEVE_MOVIES,
})

export const fetchMoviesIfNeeded: ActionCreator<
  ThunkAction<Promise<void>, State, undefined, Actions>
> = () => async (dispatch, getState) => {
  dispatch(startFetchMovies())
  const res = await fetch(fetchUrl)
  const data = await res.json()
  dispatch(recieveMovies(data))
}

export const moviesInitState: MoviesState = {
  isFetching: false,
}

export const moviesReducer: Reducer<MoviesState, Actions> = (
  state = moviesInitState,
  action,
) => {
  switch (action.type) {
    case FETCH_MOVIES:
      return {
        ...state,
        data: undefined,
        isFetching: true,
      }
    case RECIEVE_MOVIES:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      }
    default:
      return state
  }
}
