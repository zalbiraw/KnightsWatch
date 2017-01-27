import React, { PropTypes } from 'react'

import Dialog from '../Dialog'
import Field  from '../Form/Field'

const renderBody = (fields) => (
  <div className = 'fields'>
    {Object.keys(fields).map((key) => {
      return <Field key = {key} field = {fields[key]}/>
    })}
  </div>
)

const Edit = ({ index, idBy, api, fields, functions }) => (
  <Dialog
    id      = {index + '-edit'}
    type    = 'submission'
    style   = 'modal-fixed-footer'
    title   = 'Edit'
    body    = {renderBody(fields)}
    handler = {(e) => {
      e.preventDefault()

      const form = $('#' + index + '-edit-form'),
            body = {
              old: {},
              new: functions.getFormData(form)
            }

      body.old[idBy] = $(functions.getActive()).find('.' + idBy).text()

      const success = (json) => {
        form.trigger('reset')
        functions.update(json)
      }

      functions.put(api, body, { success })
      $(form).modal('close')
    }}
  />
)

Edit.propTypes = {
  index: PropTypes.string.isRequired,
  idBy: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  api: PropTypes.string.isRequired,
  functions: PropTypes.object.isRequired
}

export default Edit
