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

      functions.get('/api/secure/google-auth/', { success })

      // const target  = $(e.currentTarget),
      //       body    = functions.getFormData($('#' + form))

      // const success = json => functions.setRedirect(json.id)

      // functions.post('/api/secure/video', body, { success })
    }}
  >
    <div className = 'row'>
      <Field field = {fields.title} />
      <Field field = {fields.tags} />
    </div>
    <div className = 'row'>
      <div className = 'file-field input-field col s6'>
        <div className = 'btn'>
          <span>Video file</span>
          <input
            type    = 'file'
            accept  = 'video/*'
          />
        </div>
        <div className = 'file-path-wrapper'>
          <input className = 'file-path validate' type = 'text'/>
        </div>
      </div>
      <div className = 'input-field col s6'>
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
