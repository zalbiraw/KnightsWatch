import React, { PropTypes } from 'react'

import Field from './Structures/Form/Field'

const form      = 'register',
      style     = 'col s12',
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
        password: {
          id: 'password',
          style,
          type: 'password',
          name: 'password',
          required,
          label: 'Password'
        }
      }

const Login = ({ functions }) => (
  <form
    id        = {form}
    onSubmit  = {(e) => {
      e.preventDefault()

      const target  = $(e.currentTarget),
            body    = functions.getFormData($('#' + form))

      const success = (json, res) => {
        functions.setUser(json)
      }

      functions.post('/api/login', body, { success })
    }}
  >
    <div className = 'row'>
      <div className = 'col s0 m2 l3'></div>
      <div className = 'col s12 m8 l6'>
        <Field field = {fields.email} />
        <Field field = {fields.password} />
        <div className = 'input-field col s12'>
          <button
            id = 'login-button'
            className = 'waves-effect waves-light btn'
            type = 'submit'
            name = 'submit'
          >
            Login
          </button>
        </div>
      </div>
      <div className = 'col s0 m2 l3'></div>
    </div>
  </form>
)

Login.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Login
