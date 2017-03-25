import React, { PropTypes } from 'react'

const renderTextField = (field, type) => {
  const id    = field.id,
        style = field.style

  return (
    <div className = {style ? 'input-field ' + style : 'input-field'}>
      <input
        id          = {id}
        className   = {field.className || 'validate'}
        title       = {field.title}
        type        = {type || 'text'}
        name        = {field.name}
        pattern     = {field.pattern}
        required    = {field.required}
      />
      <label
        htmlFor     = {id}
        data-error  = {(type === 'email' && !field.error ? 'Incorrect email format' : field.error)}
      >
        {field.label}
      </label>
    </div>
  )
}

const renderSelectFeild = (field) => {
  const style   = field.style,
        options = field.options

  return (
    <div className = {style ? 'input-field ' + style : 'input-field'}>
      <select
        className     = {field.className || 'validate'}
        name          = {field.name}
        required      = {field.required}
        defaultValue  = {field.default || ''}
      >
        <option value = '' disabled>Choose your option</option>
        {Object.keys(options).map((key) => {
          const option = options[key]
          return (
            <option key = {key} value = {option.value}>
              {option.label}
            </option>
          )
        })}
      </select>
      <label>{field.label}</label>
    </div>
  )
}

const render = (field) => {
  switch(field.type) {
    case 'text':
      return renderTextField(field)

    case 'email':
      return renderTextField(field, 'email')

    case 'password':
      return renderTextField(field, 'password')

    case 'select':
      return renderSelectFeild(field)

    default:
      return null
  }
}

const Field = ({ field }) => (
  <div>
    {render(field)}
  </div>
)

Field.propTypes = {
  field: PropTypes.object.isRequired
}

export default Field
