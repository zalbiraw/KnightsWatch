import React, { PropTypes } from 'react'

import Header from './Table/Header'
import Body   from './Table/Body'
import Edit   from './Table/Edit'
import Delete from './Table/Delete'

class Table extends React.Component {
  constructor() {
    super()

    this.active   = undefined
    this.sortedBy = undefined

    this.sort         = this.sort.bind(this)
    this.setActive    = this.setActive.bind(this)
    this.setSortedBy  = this.setSortedBy.bind(this)
    this.getActive    = this.getActive.bind(this)
  }

  render() {
    const props         = this.props,
          sortedBy      = this.sortedBy,
          index         = props.index,
          idBy          = props.idBy,
          api           = props.api,
          dialogs       = props.dialogs || {},
          sort          = this.sort,
          functions     = { ...props.functions,
                            sort,
                            getActive: this.getActive,
                            setActive: this.setActive,
                            setSortedBy: this.setSortedBy
                          }

    let rows = sort(sortedBy || idBy)

    if (!rows.length) {
      return null
    }

    return (
      <div className = 'row'>
        <table className = 'responsive-table striped highlight'>
          <Header
            headers   = {props.headers}
            sortedBy  = {sortedBy}
            functions = {functions}
          />
          <Body
            index     = {index}
            rows      = {rows}
            functions = {functions}
          />
        </table>
        <div id = 'dialogs'>
          { dialogs.edit ? (
              <Edit
                index     = {index}
                idBy      = {idBy}
                fields    = {dialogs.edit}
                api       = {api}
                functions = {functions}
              />
            ) : null
          }
          { dialogs.delete ? (
              <Delete
                index     = {index}
                idBy      = {idBy}
                api       = {api}
                functions = {functions}
              />
            ) : null
          }
        </div>
      </div>
    )
  }

  getActive() {
    return this.active
  }

  setActive(active) {
    this.active = active
  }

  setSortedBy(sortedBy) {
    this.sortedBy = sortedBy
  }

  sort(by, reverse) {
    let data = this.props.data

    if (data.length == 0) {
      return []
    }

    data.sort((a, b) => {
      const i = a[by] + '',
            j = b[by] + ''

      if (!reverse) return i.localeCompare(j)
      else return j.localeCompare(i)
    })

    return data
  }
}

Table.propTypes = {
  index: PropTypes.string.isRequired,
  idBy: PropTypes.string.isRequired,
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  api: PropTypes.string.isRequired,
  dialogs: PropTypes.object,
  functions: PropTypes.object.isRequired
}

export default Table
