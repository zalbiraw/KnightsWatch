import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'

import App from './App'

const Root = () => (
    <BrowserRouter>
      <Match exactly pattern = '*' component = {App} />
    </BrowserRouter>
)

render(<Root />, document.getElementById('react-app'))
