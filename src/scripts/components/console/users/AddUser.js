import React from 'react'

import Table from '../../Table'

export default class AddUser extends React.Component {

  componentDidUpdate() {
    $('select').material_select()
  }

  componentWillUnmount() {
    $('select').material_select('destroy')
  }

  render() {
    const roles = this.props.roles

    return (
      <div className = 'add-user '>
        <div className = 'row'>
          <h5>Invite User</h5>
        </div>
        <form
          id        = 'add-user'
          className = 'row'
          onSubmit  = {(e) => {
            e.preventDefault()

            const target  = $(e.currentTarget),
                  email   = target.find('input[name=email]')[0].value,
                  role_id = target.find('select[name=role]')[0].value

            const updateInvites = this.props.updateInvites

            fetch('/api/invites', {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify({
                email,
                role_id
              })
            }).then((res) => {
              if (res.status == 200) {
                res.json().then((json) => {
                  $('#add-user').trigger('reset')
                  updateInvites(json)
                })
              }
            })
          }}
        >
          <div className = 'input-field col s4'>
            <label htmlFor = 'email'>Email</label>
            <input
              id          = 'email'
              className   = 'validate'
              type        = 'email'
              name        = 'email'
              required    = {true}
            />
          </div>
          <div className = 'input-field col s4'>
            <select
              name          = 'role'
              className     = 'validate'
              defaultValue  = ''
              required      = {true}
            >
              <option value = '' disabled>Choose your option</option>
              {Object.keys(roles).map((key) => {
                const role = roles[key]
                return (
                  <option key = {key} value = {role.id}>
                    {role.role}
                  </option>
                )
              })}
            </select>
            <label>Role</label>
          </div>
          <div className = 'input-field col s4'>
            <button
              className = 'waves-effect waves-light btn'
              type = 'submit'
              name = 'submit'
            >
              Invite User
            </button>
          </div>
        </form>
      </div>
    )
  }
}
