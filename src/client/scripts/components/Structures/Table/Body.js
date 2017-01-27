import React, { PropTypes } from 'react'

const renderRow = (id, index, rowKey, row, functions) => (
  <tr key = {index}>
    {Object.keys(row).map((cellKey) => {
      return renderCell(id, index + '.' + cellKey, rowKey, cellKey, row[cellKey], functions)
    })}
  </tr>
)

const renderCell = (id, index, rowKey, cellKey, cell, functions) => {
  switch(cellKey) {

    case 'edit':
      return (
        <td key = {index} className = 'edit'>
          <i
            className = 'material-icons'
            onClick   = {(e) => {
              const modal = $('#' + id + '-edit'),
                    row   = e.currentTarget.parentElement.parentElement

              for (let name of cell) {
                const value = $(row).find('.' + name).text(),
                      field = $(modal).find('[name=' + name + ']')

                field.val(value)

                if (field[0].type === 'select-one')
                    field.material_select();
              }
              Materialize.updateTextFields()

              modal.modal('open')
              functions.setActive(row)
            }}
          >
            mode_edit
          </i>
        </td>
      )

    case 'delete':
      return (
        <td key = {index} className = 'delete'>
          <i
            className = 'material-icons'
            onClick   = {(e) => {
              $('#' + id + '-delete').modal('open')
              functions.setActive(e.currentTarget.parentElement.parentElement)
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

const Body = ({ index, rows, functions }) => (
  <tbody>
    {Object.keys(rows).map((rowKey) => {
      return renderRow(index, index + '.' + rowKey, rowKey, rows[rowKey], functions)
    })}
  </tbody>
)

Body.propTypes = {
  index: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  functions: PropTypes.object.isRequired
}

export default Body
