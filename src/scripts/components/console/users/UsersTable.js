import React from 'react'

import Table from '../../Table'

export default class UsersTable extends React.Component {
  render() {
    const props   = this.props,
          users   = props.users,
          update  = props.updateUsers,
          index   = 'users-table',
          api     = '/api/users',
          headers = [
            [ 'first',  'First Name' ],
            [ 'last',   'Last Name' ],
            [ 'role',   'Role' ],
            [ 'email',  'Email' ]
          ],
          dialogs = [
            {
              props: {
                id: index + '-delete',
                type: 'confirmation',
                title: 'Delete',
                body:'Are you sure you would like to delete this user?'
              },
              handle: (entry) => {
                fetch(api, {
                  method: 'DELETE',
                  headers: new Headers({
                    'Content-Type': 'application/json'
                  }),
                  body: JSON.stringify(entry)
                }).then((res) => {
                  $('#' + index + '-delete').modal('close')
                  if (res.status == 200) {
                    res.json().then((json) => {
                      update(json)
                    })
                  }
                })
              }
            }
          ]

    Object.keys(users).map((key) => {
      users[key].edit = true
      users[key].delete = true
    })

    return (
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
            api       = {api}
            dialogs   = {dialogs}
            update    = {update}
          />
        </div>
      </div>
    )
  }
}
