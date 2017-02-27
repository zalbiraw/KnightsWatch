import React, { PropTypes } from 'react'

import Field from '../Structures/Form/Field'

import fields from './fields'

const form = 'create-player'

const Create = ({ functions }) => (
  <form
    id        = {form}
    onSubmit  = {(e) => {
      e.preventDefault()

      const target  = $(e.currentTarget),
            body    = functions.getFormData($('#' + form))

      const success = json => functions.setRedirect(json.id)

      functions.post('/api/secure/player', body, { success })
    }}
  >
    <div className = 'row'>
      <Field field = {fields.first} />
      <Field field = {fields.last} />
    </div>
    <div className = 'row'>
      <Field field = {fields.position} />
      <Field field = {fields.team} />
    </div>
    <div className = 'row'>
      <Field field = {fields.weight} />
      <Field field = {fields.height} />
    </div>
    <div className = 'row'>
      <div className = 'input-field col s6 offset-s6'>
        <button
          id        = 'create-player-button'
          className = 'waves-effect waves-light btn'
          type      = 'submit'
          name      = 'submit'
        >
          Create
        </button>
      </div>
    </div>
  </form>
)

Create.propTypes = {
  functions: PropTypes.object.isRequired
}

export default Create
