import React from 'react'

import Table from './Table'

export default class Users extends React.Component {
  render() {
    const users   = this.props.users,
          headers = [
            [ 'first',  'First Name' ],
            [ 'last',   'Last Name' ],
            [ 'role',   'Role' ],
            [ 'email',  'Email' ]
          ]

    return (
      <div className = 'users-table'>
        <div className = 'row'>
          <h5>Users</h5>
        </div>
        <div className = 'row'>
          <Table
            headers = {headers}
            data    = {users}
            sortBy  = 'email'
            update  = {this.props.updateUsers}
          />
        </div>
      </div>
    )
  }
}
