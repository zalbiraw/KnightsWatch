import React    from 'react'
import { Link } from 'react-router'

const Menu = ({ user, removeUser }) => (
  <div className = 'menu'>
    <div className = 'navbar-fixed'>
      <nav>
        <div className = 'container nav-wrapper'>
          <Link to = '/' className = 'home'>
            <img className = 'logo' src = '/images/logo.png' />
            <span className = 'title'>Knights Watch</span>
          </Link>
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

              removeUser()
            }}
          >
            Logout
          </a>
        </li>
      </ul>

    </div>
    <div className = 'fill-fix'></div>
  </div>
)

export default Menu
