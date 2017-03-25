import React, { PropTypes } from 'react'

import Table from '../Structures/Table'
import Field from '../Structures/Form/Field'

const style     = 'col s4',
      required  = true,
      fields    = {
        email: {
          id: 'email',
          style,
          type: 'email',
          name: 'email',
          required,
          label: 'Email'
        },
        role: {
          style,
          type: 'select',
          name: 'role_id',
          required,
          label: 'Role'
        }
      }

const InviteUser = ({ roles, functions }) => (
  <div className = 'invite-user'>
    <div className = 'row'>
      <h5>Invite User</h5>
    </div>
    <form
      id        = 'invite-user'
      className = 'row'
      onSubmit  = {(e) => {
        e.preventDefault()

        const form = $('#invite-user'),
              body = functions.getFormData(form)

        const success = (json) => {
          form.trigger('reset')
          functions.update(json)
        }

        functions.post('/api/secure/admin/invites', body, { success })
      }}
    >
      <Field field = {fields.email} />
      <Field field = {{ ...fields.role, options: roles}} />
      <div className = 'input-field col s4'>
        <button
          id        = 'invite-user-button'
          className = 'waves-effect waves-light btn'
          type      = 'submit'
          name      = 'submit'
        >
          Invite User
        </button>
      </div>
    </form>
  </div>
)

InviteUser.propTypes = {
  roles: PropTypes.array.isRequired,
  functions: PropTypes.object.isRequired
}

export default InviteUser
