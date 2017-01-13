import React    from 'react'
import { Link } from 'react-router'

const menu = () => (
  <div className = 'menu'>
    <div className = 'navbar-fixed'>
      <nav>
        <div className = 'container nav-wrapper'>
          <Link to = '/' className = 'home'>
            <img className = 'logo' src = '/images/logo.png' />
            <span className = 'title'>Knights Watch</span>
          </Link>
          <ul className = 'right'>
            <li>
              <Link to = '/console'>
                <i className = 'material-icons'>settings</i>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div className = 'fill-fix'></div>
  </div>
)

export default menu
