import React        from 'react'
import { Redirect } from 'react-router'

import Menu from '../components/Menu'

const Renderer = (user, functions) => {

  const router = (Component, restrictions, options) => {
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

        case 'isNotScout':
          if (!user.isScout) route = true
          break

        case 'isDataEntry':
          if (user.isDataEntry) route = true

      }

      if (route) return <Redirect to = {restriction.redirect} />
    }

    return wrapper(Component, options)

  }

  const wrapper = (Component, options) => {

    let search = true

    if (options && options.search === false) search = false

    return (
      <div>
        <Menu
          user      = {user}
          search    = {search}
          functions = {functions}
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
