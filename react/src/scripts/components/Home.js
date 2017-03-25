import React, { PropTypes } from 'react'

import Search from './Search'

const Home = ({ user, functions }) => (
  <div className = 'home'>
    <img className = 'logo' src = '/images/logo.png' />
    <div className = 'title'>Knights Watch</div>
    {(user && !user.isDataEntry ? (
    <nav>
      <Search functions = {functions} />
    </nav>
    ) : (
      null
    ))}
  </div>
)

Home.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Home
