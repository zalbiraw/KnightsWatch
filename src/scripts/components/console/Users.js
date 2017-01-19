import React from 'react'

import UsersTable   from './users/UsersTable'
import AddUser      from './users/AddUser'
import InvitesTable from './users/InvitesTable'

export default class Users extends React.Component {
  constructor() {
    super()

    this.state = {
      users: [],
      roles: [],
      invites: []
    }

    this.getUsers = this.getUsers.bind(this)
    this.getRoles = this.getRoles.bind(this)
    this.getInvites = this.getInvites.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.updateRoles = this.updateRoles.bind(this)
    this.updateInvites = this.updateInvites.bind(this)
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
    getData('/api/invites', this.updateInvites)
  }

  render() {
    const users         = this.getUsers(),
          roles         = this.getRoles(),
          invites       = this.getInvites(),
          updateUsers   = this.updateUsers,
          updateInvites = this.updateInvites

    return (
      <div>
        <UsersTable
          users       = {users}
          updateUsers = {updateUsers}
        />
        <AddUser
          roles         = {roles}
          updateInvites = {updateInvites}
        />
        <InvitesTable
          invites       = {invites}
          updateInvites = {updateInvites}
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

  getInvites() {
    return this.state.invites
  }

  updateUsers(users) {
    // Materialize.toast('Users updated!!', 3000, 'rounded')
    this.setState({ users })
  }

  updateRoles(roles) {
    // Materialize.toast('Roles updated!', 3000, 'rounded')
    this.setState({ roles })
  }

  updateInvites(invites) {
    // Materialize.toast('Invites updated!', 3000, 'rounded')
    this.setState({ invites })
  }
}
