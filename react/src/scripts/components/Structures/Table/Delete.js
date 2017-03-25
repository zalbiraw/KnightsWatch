import React, { PropTypes } from 'react'

import Dialog from '../Dialog'

const Delete = ({ index, idBy, api, functions }) => (
  <Dialog
    id      = {index + '-delete'}
    type    = 'confirmation'
    title   = 'Delete'
    body    = 'Are you sure you would like to delete this entry?'
    handler = {(e) => {
      const body = {}

      body[idBy] = $(functions.getActive()).find('.' + idBy).text()

      const success = json => functions.update(json)

      functions.del(api, body, { success })
      $('#' + index + '-delete').modal('close')
    }}
  />
)

Delete.propTypes = {
  index: PropTypes.string.isRequired,
  idBy: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  functions: PropTypes.object.isRequired
}

export default Delete
