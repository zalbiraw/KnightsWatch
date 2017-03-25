import React, { PropTypes } from 'react'

import Table from '../Structures/Table'

const index     = 'users-table',
      style     = 'col s6',
      className = 'validate valid',
      required  = true,
      headers   = [
        [ 'first',  'First Name' ],
        [ 'last',   'Last Name' ],
        [ 'role',   'Role' ],
        [ 'email',  'Email' ]
      ],
      first     = {
        id: 'first-edit',
        style,
        className,
        type: 'text',
        name: 'first',
        required,
        label: 'Frist Name'
      },
      last      = {
        id: 'last-edit',
        style,
        className,
        type: 'text',
        name: 'last',
        required,
        label: 'Last Name'
      },
      role_id   = {
        style,
        className,
        type: 'select',
        name: 'role_id',
        required,
        label: 'Role'
      },
      email     = {
        id: 'email-edit',
        style,
        className,
        type: 'email',
        name: 'email',
        required,
        label: 'Email'
      }

const UsersTable = ({ users, roles, functions }) => (
    <div className = 'users-table'>
      <div className = 'row'>
        <h5>Users</h5>
      </div>
      <div className = 'row'>
        <Table
          index     = {index}
          idBy      = 'email'
          headers   = {headers}
          data      = {users}
          api       = {'/api/secure/admin/users'}
          dialogs   = {{ edit: [ first, last, { ...role_id, options: roles }, email ], delete: true }}
          functions = {functions}
        />
      </div>
    </div>
)

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  functions: PropTypes.object.isRequired
}

export default UsersTable
