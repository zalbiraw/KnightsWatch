import React from 'react'

import Search from './Search'

const Home = ({ functions }) => (
  <div className = 'home'>
    <img className = 'logo' src = '/images/logo.png' />
    <nav>
      <Search functions = {functions} />
    </nav>
  </div>
)

export default Home
