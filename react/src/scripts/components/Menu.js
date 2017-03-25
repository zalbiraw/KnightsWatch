import React, { PropTypes } from 'react'
import { Link }             from 'react-router'

import Search from './Search'

const Menu = ({ user, search, functions }) => (

  <div className = 'menu'>
    <div className = 'navbar-fixed'>
      <nav>
        <div className = 'container nav-wrapper'>
          <Link to = '/'>
            <img className = 'logo' src = '/images/logo.png' />
            <span className = 'title'>Knights Watch</span>
          </Link>

          {(search && user && !user.isDataEntry ? (
            <Search functions = {functions}/>
          ) : (
            null
          ))}

          <div className = 'menu-fill'></div>

          <ul className = 'right'>
            {(user ? (
            <li>
              <a className = 'dropdown-button' data-activates = 'settings'>
                <i className = 'material-icons'>settings</i>
              </a>
            </li>
            ) : (
            <li>
              <Link to = '/login'>
                Login
              </Link>
            </li>
            ))}
          </ul>
        </div>
      </nav>

      <ul id = 'settings' className = 'dropdown-content'>
        {(user && user.isAdmin ? (
        <li>
          <Link to = '/console'>
            Admin Console
          </Link>
        </li>
        ) : (
        null
        ))}
        <li>
          <a
            onClick = {(e) => {
              e.preventDefault()

              functions.removeUser()
            }}
          >
            Logout
          </a>
        </li>
      </ul>

    </div>
    <div className = 'fill-fix'></div>
    {(user ? (
    <div className = 'fixed-action-btn'>
      <a className = 'btn-floating btn-large'>
        <i className = 'material-icons'>menu</i>
      </a>
      <ul>
        <li>
          <Link to = '/player' className = 'btn-floating'>
            <i className = 'material-icons'>person_add</i>
          </Link>
        </li>
        <li>
          <Link to = '/video' className = 'btn-floating'>
            <i className = 'material-icons'>video_call</i>
          </Link>
        </li>
      </ul>
    </div>
    ) : (
    null
    ))}
  </div>
)

Menu.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Menu
