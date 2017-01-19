import React from 'react'

import Table from '../../Table'

export default class InvitesTable extends React.Component {
  render() {
    const props   = this.props,
          invites = props.invites,
          update  = props.updateInvites,
          index   = 'invites-table',
          api     = '/api/invites',
          headers = [
            [ 'email',  'Email' ],
            [ 'role_id',   'Role' ]
          ],
          dialogs = [
            {
              props: {
                id: index + '-delete',
                type: 'confirmation',
                title: 'Delete',
                body:'Are you sure you would like to delete this invite?'
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

    Object.keys(invites).map((key) => {
      invites[key].delete = true
    })

    return (
      <div className = {index}>
        <div className = 'row'>
          <h5>Invites</h5>
        </div>
        <div className = 'row'>
          <Table
            index     = {index}
            idBy      = 'email'
            headers   = {headers}
            data      = {invites}
            api       = {api}
            dialogs   = {dialogs}
            update    = {update}
          />
        </div>
      </div>
    )
  }
}
