import React, { PropTypes }  from 'react'

import Loading      from './Loading'
import UsersTable   from './console/UsersTable'
import InviteUser   from './console/InviteUser'
import InvitesTable from './console/InvitesTable'

class Console extends React.Component {
  constructor() {
    super()

    this.state = {}

    this.getRoles = this.getRoles.bind(this)
    this.getUsers = this.getUsers.bind(this)
    this.getInvites = this.getInvites.bind(this)
    this.updateRoles = this.updateRoles.bind(this)
    this.updateUsers = this.updateUsers.bind(this)
    this.updateInvites = this.updateInvites.bind(this)
  }

  componentWillMount() {
    const get  = this.props.functions.get

    get('/api/secure/admin/roles', {
      success: {
        callback: this.updateRoles,
        preventNotification: true
      }
    })

    get('/api/secure/admin/users', {
      success: {
        callback: this.updateUsers,
        preventNotification: true
      }
    })

    get('/api/secure/admin/invites', {
      success: {
        callback: this.updateInvites,
        preventNotification: true
      }
    })

  }

  componentDidUpdate() {
    $('select').material_select()
  }

  render() {
    const roles         = this.getRoles(),
          users         = this.getUsers(),
          invites       = this.getInvites(),
          updateUsers   = this.updateUsers,
          updateInvites = this.updateInvites,
          functions     = this.props.functions

    if (!roles || !users || !invites) {
      return (
        <Loading />
      )
    }

    $(document).ready(function(){
      $('.modal').modal()
    })

    return (
      <div>
        <UsersTable
          roles     = {roles}
          users     = {users}
          functions = {{ ...functions, update: updateUsers }}
        />
        <InviteUser
          roles     = {roles}
          functions = {{ ...functions, update: updateInvites }}
        />
        <InvitesTable
          invites   = {invites}
          functions = {{ ...functions, update: updateInvites }}
        />
      </div>
    )
  }

  getRoles() {
    return this.state.roles
  }

  getUsers() {
    return this.state.users
  }

  getInvites() {
    return this.state.invites
  }

  updateUsers(users) {
    const roles     = this.getRoles(),
          role_ids  = {}

    Object.keys(roles).map((key) => {
      const role = roles[key]
      role_ids[role.label] = role.value
    })

    Object.keys(users).map((key) => {
      const user = users[key]

      user['role_id hidden']  = role_ids[user.role]
      user.edit               = [ 'first', 'last', 'role_id', 'email' ]
      user.delete             = true
    })

    this.setState({ users })
  }

  updateRoles(res) {
    const roles = []

    Object.keys(res).map((key) => {
      const role = res[key]
      roles.push({
        value: role.id,
        label: role.role
      })
    })

    this.setState({ roles })
  }

  updateInvites(invites) {
    Object.keys(invites).map((key) => {
      invites[key].delete = true
    })

    this.setState({ invites })
  }
}

Console.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Console
