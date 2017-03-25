import React                      from 'react'
import { Match, Miss, Redirect }  from 'react-router'

import Register   from './components/Register'
import Login      from './components/Login'
import Home       from './components/Home'
import Console    from './components/Console'
import Player     from './components/Player'
import Video      from './components/Video'
import ErrorPage  from './components/ErrorPage'

import Requests from './helpers/Requests'
import Renderer from './helpers/Renderer'
import f        from './helpers/functions'

class App extends React.Component {

  constructor() {
    super()

    this.state = {}

    this.getError = this.getError.bind(this)
    this.setError = this.setError.bind(this)

    this.getUser    = this.getUser.bind(this)
    this.setUser    = this.setUser.bind(this)
    this.removeUser = this.removeUser.bind(this)
  }

  componentWillMount() {

    const user = sessionStorage.user

    if (user) {
      this.setState({ user: JSON.parse(user) })
    }

  }

  componentDidUpdate() {
    $('.dropdown-button').dropdown()
  }

  render() {

    const error       = this.getError(),
          setError    = this.setError,
          user        = this.getUser(),
          setUser     = this.setUser,
          removeUser  = this.removeUser,
          coin        = (user ? user.coin : undefined),
          functions   = {
            ...f,
            ...Requests(coin, setError, removeUser),
            setError,
            removeUser
          },
          { router }  = Renderer(user, functions)

    if (error) {
      return this.renderError(error)
    }

    const RegisterWrapper = () => {
      return router((
        <Register
          functions = {{ setUser, ...functions }}
        />
      ), [
        { condition: 'isLoggedIn', redirect: '/' }
      ])
    }

    const LoginWrapper = () => {
      return router((
        <Login
          functions = {{ setUser, ...functions }}
        />
      ), [
        { condition: 'isLoggedIn', redirect: '/' }
      ])
    }

    const HomeWrapper = () => {
      return router((
        <Home
          user      = {user}
          functions = {functions}
        />
      ), [
        { condition: 'isNotLoggedIn', redirect: '/login' }
      ], {
        search: false
      })
    }

    const ConsoleWrapper = () => {
      return router((
        <Console
          functions = {functions}
        />
      ), [
        { condition: 'isNotLoggedIn', redirect: '/login' },
        { condition: 'isNotAdmin', redirect: '/' }
      ])
    }

    const PlayerWrapper = ({ params }) => {
      const player = params.id

      if (player) {
        return router((
          <Player
            player    = {player}
            functions = {functions}
          />
        ), [
          { condition: 'isNotLoggedIn', redirect: '/login' },
          { condition: 'isDataEntry', redirect: '/' }
        ])
      }

      return router((
        <Player
          functions = {functions}
        />
      ), [
        { condition: 'isNotLoggedIn', redirect: '/login' }
      ])
    }

    const VideoWrapper = ({ params }) => {
      const video = params.id

      if (video) {
        return router((
          <Video
            video     = {video}
            functions = {functions}
          />
        ), [
          { condition: 'isNotLoggedIn', redirect: '/login' },
          { condition: 'isDataEntry', redirect: '/' }
        ])
      }

      return router((
        <Video
          functions = {functions}
        />
      ), [
        { condition: 'isNotLoggedIn', redirect: '/login' }
      ])
    }

    const NotFound = () => (
      <ErrorPage
        code    = {404}
        message = {'Not Found :('}
      />
    )

    return (
      <div>
        <Match exactly pattern = '/'            component = {HomeWrapper} />
        <Match exactly pattern = '/register'    component = {RegisterWrapper} />
        <Match exactly pattern = '/login'       component = {LoginWrapper} />
        <Match exactly pattern = '/console'     component = {ConsoleWrapper} />
        <Match exactly pattern = '/player'      component = {PlayerWrapper} />
        <Match exactly pattern = '/player/:id'  component = {PlayerWrapper} />
        <Match exactly pattern = '/video'       component = {VideoWrapper} />
        <Match exactly pattern = '/video/:id'   component = {VideoWrapper} />
        <Miss component = {NotFound} />
      </div>
    )

  }

  getError() {
    return this.state.error
  }

  setError(error, callback) {

    if (callback) {

      this.state.error = error
      callback()

    } else this.setState({ error })

  }

  renderError({ code, message }) {
    return (
      <ErrorPage
        code    = {code}
        message = {message}
      />
    )
  }

  getUser() {
    return this.state.user
  }

  setUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    this.setState({ user })
  }

  removeUser() {
    sessionStorage.removeItem('user')
    this.setState({ user: undefined })
  }

}

export default App
