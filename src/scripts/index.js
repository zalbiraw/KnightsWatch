import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Match, Miss } from 'react-router'

import App      from './App'
import Console  from './Console'
import NotFound from './NotFound'

const Root = () => (
    <BrowserRouter>
      <div>
        <Match exactly pattern = '/' component = {App} />
        <Match exactly pattern = '/console' component = {Console} />
        <Miss component = {NotFound} />
      </div>
    </BrowserRouter>
)

render(<Root />, document.getElementById('react-app'))
