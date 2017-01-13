import React from 'react'

export default class AddUser extends React.Component {
  componentDidUpdate() {
    $('select').material_select()
  }

  componentWillUnmount() {
    $('select').material_select('destroy')
  }

  render() {
    const roles = this.props.roles

    return (
      <div className = 'add-user'>
        <input type = 'text' />
        <div>
          <select defaultValue = ''>
            <option value = '' disabled>Choose your option</option>
            {Object.keys(roles).map((key) => {
              const role = roles[key]
              return (
                <option key = {key} value = {role.id}>
                  {role.role}
                </option>
              )
            })}
          </select>
          <label>Role</label>
        </div>
      </div>
    )
  }
}
