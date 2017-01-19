import React from 'react'

import Header from './Table/Header'
import Body   from './Table/Body'
import Dialog from './Dialog'

export default class Table extends React.Component {
  constructor() {
    super()

    this.active   = undefined
    this.sortedBy = undefined

    this.sort         = this.sort.bind(this)
    this.setActive    = this.setActive.bind(this)
    this.setSortedBy  = this.setSortedBy.bind(this)
  }

  render() {
    const props         = this.props,
          sortedBy      = this.sortedBy,
          index         = props.index,
          dialogs       = props.dialogs || [],
          idBy          = props.idBy

    const renderRow     = this.renderRow,
          sort          = this.sort,
          update        = props.update

    let rows = sort(sortedBy || idBy)

    if (!rows.length) {
      return null
    }

    $(document).ready(function(){
      $('.modal').modal()
    })

    return (
      <div className = 'row'>
        <table className = 'responsive-table striped highlight'>
          <Header
            headers     = {props.headers}
            sort        = {sort}
            sortedBy    = {sortedBy}
            setSortedBy = {this.setSortedBy}
            update      = {update}
          />
          <Body
            index     = {index}
            rows      = {rows}
            setActive = {this.setActive}
          />
        </table>
        {Object.keys(dialogs).map((key) => {
          const dialog = dialogs[key]

          return <Dialog
            { ...dialog.props}
            key     = {key}
            handler = {(e) => {
              const entry   = {}

              entry[idBy] = $(this.active).find('.' + idBy).text()
              dialog.handle(entry)
            }}
          />
        })}
      </div>
    )
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
