import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { makeStore } from 'data/store'
import { ClientAppRoot } from 'components/Layout/ClientAppRoot'
// import { fetchMovies } from 'data/reducer'

const store = makeStore((window as any).__INITIAL_STATE__)

// store.dispatch(fetchMovies())

hydrate(
  <Provider store={store}>
    <ClientAppRoot />
  </Provider>,
  document.getElementById('root'),
)
