import React, { PropTypes } from 'react'

const renderButtons = (type, handler) => {
  switch(type) {
    case 'confirmation':
      return renderConfirmation(handler)

    case 'submission':
      return renderSubmission()

    default:
      return null
  }
}

const renderConfirmation = (handler) => {
  return (
    <div className = 'modal-footer'>
      <label className = 'modal-action waves-effect btn-flat' onClick = {handler}>
        Confirm
      </label>
      <label className = 'modal-action modal-close waves-effect btn-flat'>
        Cancel
      </label>
    </div>
  )
}

const renderSubmission = (handler) => {
  return (
    <div className = 'modal-footer'>
      <button
        className = 'modal-action waves-effect btn-flat'
        type = 'submit'
        name = 'submit'
      >
        Submit
      </button>
      <label className = 'modal-action modal-close waves-effect btn-flat'>
        Cancel
      </label>
    </div>
  )
}

const Dialog = ({ id, type, style, title, body, handler }) => (
  <div>
    {type === 'submission' ? (
      <div id = {id} className = {'modal ' + style}>
        <form id = {id + '-form'} onSubmit = {handler}>
          <div className = 'modal-content'>
            <h4>{title}</h4>
            {body}
          </div>
          {renderButtons(type, handler)}
        </form>
      </div>
    ) : (
      <div id = {id} className = {'modal ' + style}>
        <div className = 'modal-content'>
          <h4>{title}</h4>
          <span>{body}</span>
        </div>
        {renderButtons(type, handler)}
      </div>
    )}
  </div>
)

Dialog.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  style: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object
  ]).isRequired,
  handler: PropTypes.func.isRequired
}

export default Dialog
