import React, { PropTypes } from 'react'

import Field from './Structures/Form/Field'

import fields from './Register/fields'

const form = 'register'

const Register = ({ functions }) => (
  <div>
    <div className = 'row'>
      <h5>Complete Registration</h5>
    </div>
    <form
      id        = {form}
      className = 'row'
      onSubmit  = {(e) => {
        e.preventDefault()

        const target      = $(e.currentTarget),
              body        = {
                id: functions.getURLParam('id'),
                ...functions.getFormData($('#' + form))
              }

        const success = (json, res) => {
          functions.setUser(json)
        }

        if (body.password != body.confirm) {
          $('#password').removeClass('valid').addClass('invalid')
          $('#confirm').removeClass('valid').addClass('invalid')
          functions.notify('Passwords do not match!')
        } else {
          delete body.confirm
          functions.post('/api/auth/register', body, { success })
        }
      }}
    >
      <div className = 'row'>
        <Field field = {fields.first} />
        <Field field = {fields.last} />
      </div>
      <div className = 'row'>
        <Field field = {fields.password} />
        <Field field = {fields.confirm} />
      </div>
      <div className = 'row'>
        <div className = 'input-field col s6 offset-s6'>
          <button
            id        = 'register-button'
            className = 'waves-effect waves-light btn'
            type      = 'submit'
            name      = 'submit'
          >
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
)

Register.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Register
