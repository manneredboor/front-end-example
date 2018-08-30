import * as React from 'react'
import { RequestHandler } from 'express'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { makeStore } from 'data/store'
import { Html } from 'components/Layout/Html'
import { App } from 'components/App'
import unwrapStats from '@gnarlycode/react-app-tools/helpers/unwrap-stats'
import { fetchMoviesIfNeeded } from 'data/modules/movies'

export default (allstats: any): RequestHandler => async (req, res, next) => {
  const { scripts } = unwrapStats(allstats)
  const sheet = new ServerStyleSheet()
  const store = makeStore()

  await store.dispatch(fetchMoviesIfNeeded())

  // Render App
  const markup = renderToString(
    sheet.collectStyles(
      <Provider store={store}>
        <App />
      </Provider>,
    ),
  )

  // Render Html
  const html = renderToStaticMarkup(
    <Html
      initialState={store.getState()}
      markup={markup}
      scripts={scripts}
      styleEl={sheet.getStyleElement()}
    />,
  )

  // Response
  res.send(`<!doctype html>${html}`)
}
