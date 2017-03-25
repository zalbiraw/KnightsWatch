import React, { PropTypes } from 'react'

import Field from './Structures/Form/Field'

import fields from './Login/fields'

const form = 'register'

const Login = ({ functions }) => (
  <form
    id        = {form}
    onSubmit  = {(e) => {
      e.preventDefault()

      const target  = $(e.currentTarget),
            body    = functions.getFormData($('#' + form))

      const success = json => functions.setUser(json)

      functions.post('/api/auth/login', body, { success })
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
