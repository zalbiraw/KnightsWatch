import React from 'react'

import UsersTable from './users/UsersTable'
import AddUser from './users/AddUser'

export default class Users extends React.Component {
  constructor() {
    super()

    this.state = {
      users: [],
      roles: []
    }

    this.getUsers = this.getUsers.bind(this)
    this.getRoles = this.getRoles.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.updateRoles = this.updateRoles.bind(this)
  }

  componentWillMount() {
    const getData = (path, cb) => {
      fetch(path).then((res) => {
        res.json().then((json) => {
          cb(json)
        })
      })
    }

    getData('/api/users', this.updateUsers)
    getData('/api/roles', this.updateRoles)
  }

  render() {
    const users       = this.getUsers(),
          roles       = this.getRoles(),
          updateUsers = this.updateUsers

    return (
      <div>
        <UsersTable
          users       = {users}
          updateUsers = {updateUsers}
        />
        <AddUser
          roles       = {roles}
        />
      </div>
    )
  }

  getUsers() {
    return this.state.users
  }

  getRoles() {
    return this.state.roles
  }

  updateUsers(users) {
    this.setState({ users })
  }

  updateRoles(roles) {
    this.setState({ roles })
  }
}
