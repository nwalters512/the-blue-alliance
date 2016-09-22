import 'babel-polyfill'
import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { indigo500, indigo700 } from 'material-ui/styles/colors'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import ReactDOM from 'react-dom'
import queryString from 'query-string'
import GamedayFrame from './components/GamedayFrame'
import gamedayReducer from './reducers'
import { setWebcastsRaw, setLayout, addWebcastAtLocation } from './actions'
import { MAX_SUPPORTED_VIEWS } from './constants/LayoutConstants'

// Needed for Material-UI
injectTapEventPlugin();

const webcastData = $.parseJSON($('#webcasts_json').text())

const store = createStore(gamedayReducer, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

// Set up theme
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: indigo500,
    primary2Color: indigo700,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <GamedayFrame />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('content')
)

store.subscribe(() => {
  const params = {}

  const state = store.getState()
  const layout = state.layout
  if (layout && layout.layoutSet) {
    params.layout = layout.layoutId
  }

  const displayedWebcasts = state.displayedWebcasts
  if (displayedWebcasts) {
    for (let i = 0; i < displayedWebcasts.length; i++) {
      if (displayedWebcasts[i]) {
        params[`view_${i}`] = displayedWebcasts[i]
      }
    }
  }

  const query = queryString.stringify(params)
  if (query) {
    location.replace(`#${query}`)
  }
})

store.dispatch(setWebcastsRaw(webcastData))

// Now that webcasts are loaded, attempt to restore any state that's present in
// the URL hash
const params = queryString.parse(location.hash)
if (params.layout && Number.isInteger(Number.parseInt(params.layout, 10))) {
  store.dispatch(setLayout(Number.parseInt(params.layout, 10)))
}

for (let i = 0; i < MAX_SUPPORTED_VIEWS; i++) {
  const key = `view_${i}`
  if (params[key]) {
    store.dispatch(addWebcastAtLocation(params[key], i))
  }
}
