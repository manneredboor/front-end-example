import { applyMiddleware, compose, createStore } from 'redux'
import thunk, { ThunkMiddleware, ThunkDispatch } from 'redux-thunk'
import { reducer, initState } from 'data/reducer'
import { State } from 'models/State'
import * as config from 'config'
import isBrowser from 'is-in-browser'

type ComposeType = <R>(a: R) => R

export const makeStore = (init: State = initState) => {
  // Middlewares
  const middlewares = [thunk as ThunkMiddleware<State>]

  // Dev Middlewares
  if (config.isDev && isBrowser) {
    const { createLogger } = require('redux-logger')
    const logger = createLogger()
    middlewares.push(logger)
  }

  // Redux Dev Tools
  const composeEnhancers =
    (config.isDev &&
      typeof window === 'object' &&
      ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ as ComposeType)) ||
    compose

  // Create and return Store
  return createStore(
    reducer,
    init,
    composeEnhancers(
      applyMiddleware<ThunkDispatch<State, undefined, any>, State>(
        ...middlewares,
      ),
    ),
  )
}
