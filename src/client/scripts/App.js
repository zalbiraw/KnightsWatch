import React            from 'react'
import { Match, Miss }  from 'react-router'

import Register   from './components/Register'
import Login      from './components/Login'
import Dashboard  from './components/Dashboard'
import Console    from './components/Console'
import ErrorPage  from './components/ErrorPage'

import Requests from './helpers/Requests'
import Renderer from './helpers/Renderer'

import sharedHelpers from '../../shared/helpers'

class App extends React.Component {

  constructor() {
    super()

    this.state = {}

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

    const user        = this.getUser(),
          coin        = (user ? user.coin : undefined),
          setUser     = this.setUser,
          removeUser  = this.removeUser,
          { router }  = Renderer(user, removeUser),
          functions   = {
            ...Requests(coin),
            ...sharedHelpers
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

    const DashboardWrapper = () => {
      return router((
        <Dashboard
          functions = {functions}
        />
      ), [
        { condition: 'isNotLoggedIn', redirect: '/login' }
      ])
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

    const NotFound = () => (
      <ErrorPage
        code    = {404}
        message = {'Not Found :('}
      />
    )

    return (
      <div>
        <Match exactly pattern = '/'          component = {DashboardWrapper} />
        <Match exactly pattern = '/register'  component = {RegisterWrapper} />
        <Match exactly pattern = '/login'     component = {LoginWrapper} />
        <Match exactly pattern = '/console'   component = {ConsoleWrapper} />
        <Miss component = {NotFound} />
      </div>
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
