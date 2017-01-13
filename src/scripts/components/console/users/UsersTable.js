import React from 'react'

export default class Users extends React.Component {
  constructor() {
    super()

    this.sortedBy = undefined

    this.handleClick  = this.handleClick.bind(this)
    this.sort         = this.sort.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  componentWillMount() {
    this.users = this.props.users

    this.sort('email')
  }

  renderHeader(key, header) {
    const className = header[0]
    return (
      <li key = {key} className = {className} onClick = {this.handleClick}>
        {header[1]}
        {this.renderSortMarker(className)}
      </li>
    )
  }

  renderSortMarker (className) {
      let sort = this.sortedBy

      if (sort !== undefined) {
        sort = sort.split(' ')

        if (sort[0] == className) {
          if (sort[1] != 'reverse') {
            sort = 'sort down'
          } else {
            sort = 'sort up'
          }
        } else {
          sort = undefined
        }
      }

      return (
        <span className = {sort || 'sort'}>
          <i className = 'material-icons'>arrow_drop_up</i>
          <i className = 'material-icons'>arrow_drop_down</i>
        </span>
      )
    }

  renderUser(key, user) {
    return (
      <li key = {key}>
        <ul className = 'user'>
          <li className = 'first'>{user.first}</li>
          <li className = 'last'>{user.last}</li>
          <li className = 'role'>{user.role}</li>
          <li className = 'email'>{user.email}</li>
        </ul>
      </li>
    )
  }

  render() {
    const users = this.props.users,
          headers = [
            [ 'first',  'First Name' ],
            [ 'last',   'Last Name' ],
            [ 'role',   'Role' ],
            [ 'email',  'Email' ]
          ]

    const renderHeader  = this.renderHeader,
          renderUser    = this.renderUser

    return (
      <ul className = 'users'>
        <li>
          <ul className = 'user-headers'>
            {Object.keys(headers).map((key) => {
              return renderHeader(key, headers[key])
            })}
          </ul>
        </li>
        {Object.keys(users).map((key) => {
          return renderUser(key, users[key])
        })}
      </ul>
    )
  }

  handleClick(e) {
    const className = e.currentTarget.className

    switch(className) {
      case 'first': case 'last': case 'role': case 'email':
        this.sort(className)
        break
    }
  }

  sort(by) {
    let reverse = false,
        users   = this.users

    if (by === this.sortedBy) {
      reverse = true
    }

    users.sort((a, b) => {
      if (!reverse) return a[by].localeCompare(b[by])
      else return b[by].localeCompare(a[by])
    })

    this.sortedBy = by + (reverse ? ' reverse' : '')

    this.props.updateUsers(users)
  }
}
