import React, { PropTypes } from 'react'
import { Link }             from 'react-router'

class Menu extends React.Component {

  constructor() {

    super()

    this.state = {}

    this.getResults = this.getResults.bind(this)
    this.setResults = this.setResults.bind(this)

    this.search = this.search.bind(this)

  }

  render() {

    const props     = this.props,
          search    = this.search,
          results   = this.getResults(),
          user      = props.user,
          functions = props.functions

    return (
      <div className = 'menu'>
        <div className = 'navbar-fixed'>
          <nav>
            <div className = 'container nav-wrapper'>
              <Link to = '/' className = 'home'>
                <img className = 'logo' src = '/images/logo.png' />
                <span className = 'title'>Knights Watch</span>
              </Link>

              <form className = 'search-bar' onSubmit = {e => e.preventDefault()}>
              {(user && !user.isDataEntry ? (
                <div className = 'input-field'>
                  <input id = 'search' type = 'search' required
                    onChange = {e => search(e.currentTarget.value)}
                  />
                  <label className = 'label-icon' htmlFor = 'search'>
                    <i className = 'material-icons'>search</i>
                  </label>
                  <i className = 'material-icons'>close</i>
                </div>
                ) : (
                null
                ))}
              </form>

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
        {(user && !user.isDataEntry && results && results.length? (
        <div className = 'search-results'>
        <ul className = 'container'>
            {Object.values(results).map(player => {
              const id = player.id

              return (
                <li key = {id}>
                  <Link to = {'/player/' + id}>
                    <span>{player.first}</span>
                    <span>{player.last}</span>
                    <span>{player.position}</span>
                    <span>{player.team}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        ) : (
        null
        ))}
      </div>
    )
  }

  getResults() {
    return this.state.results
  }

  setResults(results) {
    this.setState({ results })
  }

  search(term) {

    if (term && term.length > 2) {

      const post = this.props.functions.post

      const success = json => this.setResults(json)

      post('/api/secure/scout/search', { term }, {
        success: {
          callback: success,
          preventNotification: true
        }
      })

    } else {

      this.setResults([])

    }
  }

}

Menu.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Menu
