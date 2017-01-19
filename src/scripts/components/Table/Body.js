import React from 'react'

export default class Body extends React.Component {

  renderRow(index, rowKey, row) {
    return (
      <tr key = {index}>
        {Object.keys(row).map((cellKey) => {
          return this.renderCell(index + '.' + cellKey, rowKey, cellKey, row[cellKey])
        })}
      </tr>
    )
  }

  renderCell(index, rowKey, cellKey, cell) {
    const props = this.props

    switch(cellKey) {
      case 'edit':
        return (
          <td
            key       = {index}
            className = 'edit'
          >
            <i className = 'material-icons'>mode_edit</i>
          </td>
        )

      case 'delete':
        return (
          <td key = {index} className = 'delete'>
            <i
              className = 'material-icons'
              onClick   = {(e) => {
                $('#' + props.index + '-delete').modal('open')
                props.setActive(e.currentTarget.parentElement.parentElement)
              }}
            >
              delete
            </i>
          </td>
        )

      default:
        return <td key = {index} className = {cellKey}>{cell}</td>
    }
  }

  render() {
    const props = this.props,
          index = props.index,
          rows  = props.rows

    return (
      <tbody>
        {Object.keys(rows).map((rowKey) => {
          return this.renderRow(index + '.' + rowKey, rowKey, rows[rowKey])
        })}
      </tbody>
    )
  }
}
