import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'unstated'

import '@babel/polyfill'

import App from './components/App'

import './scss/index.scss'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root')
)
