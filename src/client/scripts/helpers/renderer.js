import React        from 'react'
import { Redirect } from 'react-router'

import Menu from '../components/Menu'

const Renderer = (user, removeUser) => {

  const router = (Component, restrictions) => {
    for (let i = 0; i < restrictions.length; ++i) {

      const restriction = restrictions[i],
            condition   = restriction.condition

      let route = false
      switch(condition) {

        case 'isNotLoggedIn':
          if (!user) route = true
          break

        case 'isLoggedIn':
          if (user) route = true
          break

        case 'isNotAdmin':
          if (!user.isAdmin) route = true
          break

      }

      if (route) return <Redirect to = {restriction.redirect} />
    }

    return wrapper(Component)

  }

  const wrapper = (Component) => {
    return (
      <div>
        <Menu
          user        = {user}
          removeUser  = {removeUser}
        />
        <div className = 'container'>
          {Component}
        </div>
      </div>
    )
  }

  return { router }

}

export default Renderer
