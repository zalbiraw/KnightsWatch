import React from 'react'

import Menu   from './components/Menu'
import Users  from './components/console/Users'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <div className = 'container'>
          <Users />
        </div>
      </div>
    )
  }
}
