import * as React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import { makeStore } from 'data/store'
import { ClientAppRoot } from 'components/Layout/ClientAppRoot'

const store = makeStore({ init: (window as any).__INITIAL_STATE__ })

hydrate(
  <Provider store={store}>
    <ClientAppRoot />
  </Provider>,
  document.getElementById('root'),
)
