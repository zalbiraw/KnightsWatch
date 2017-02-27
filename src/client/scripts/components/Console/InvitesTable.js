import React, { PropTypes } from 'react'

import Table from '../Structures/Table'

const index   = 'invites-table',
      headers = [
        [ 'email',  'Email' ],
        [ 'role',   'Role' ]
      ]

const InvitesTable = ({ invites, functions }) => (
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
        api       = {'/api/secure/admin/invites'}
        dialogs   = {{ delete: true }}
        functions = {functions}
      />
    </div>
  </div>
)

InvitesTable.propTypes = {
  invites: PropTypes.array.isRequired,
  functions: PropTypes.object.isRequired
}

export default InvitesTable
