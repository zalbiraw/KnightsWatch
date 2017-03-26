import React, { PropTypes } from 'react'

import Field from '../Structures/Form/Field'

import fields from './fields'

const form = 'create-video'

const Create = ({ functions }) => (
  <form
    id        = {form}
    onSubmit  = {(e) => {
      e.preventDefault()

      const success = async json => {
        console.log(json)
      }

      functions.post('/api/secure/google-auth/', { iat: Math.ceil(Date.now() / 1000) }, { success })

      // const target  = $(e.currentTarget),
      //       body    = functions.getFormData($('#' + form))

      // const success = json => functions.setRedirect(json.id)

      // functions.post('/api/secure/video', body, { success })
    }}
  >
    <div className = 'row'>
      <div className = 'input-field col s6 offset-s6'>
        <button
          id        = 'create-video-button'
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
