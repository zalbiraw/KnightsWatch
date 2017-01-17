import React from 'react'

export default class Users extends React.Component {
  constructor() {
    super()

    this.sortedBy = undefined

    this.handleClick  = this.handleClick.bind(this)
    this.sort         = this.sort.bind(this)
    this.renderHeader = this.renderHeader.bind(this)
  }

  renderHeader(key, header) {
    const className = header[0]
    return (
      <th
        key         = {key}
        className   = {className}
        data-field  = {className}
        onClick     = {this.handleClick}
      >
        {header[1]}
        {this.renderSortMarker(className)}
        <div className = 'responsive-fix'></div>
      </th>
    )
  }

  renderSortMarker(className) {
    let sort = this.sortedBy

    if (sort !== undefined) {
      sort = sort.split(' ')

      if (sort[0] == className) {
        if (sort[1] != 'reverse') {
          sort = 'sort down'
        } else {
          sort = 'sort up'
        }
      } else {
        sort = undefined
      }
    }

    return (
      <span className = {sort || 'sort'}>
        <i className = 'material-icons'>arrow_drop_up</i>
        <i className = 'material-icons'>arrow_drop_down</i>
      </span>
    )
  }

  renderRow(key, data) {
    return (
      <tr key = {key}>
        {Object.keys(data).map((key) => {
          return <td key = {key}>{data[key]}</td>
        })}
      </tr>
    )
  }

  render() {
    const props   = this.props,
          headers = props.headers

    let data = this.sort(this.sortedBy || props.sortBy)

    const renderHeader  = this.renderHeader,
          renderRow     = this.renderRow

    if (!data.length) {
      return null
    }

    return (
      <div className = 'row'>
        <table className = 'responsive-table striped highlight'>
          <thead>
            <tr>
              {Object.keys(headers).map((key) => {
                return renderHeader(key, headers[key])
              })}
            </tr>
          </thead>
          <tbody>
            {Object.keys(data).map((key) => {
              return renderRow(key, data[key])
            })}
          </tbody>
        </table>
      </div>
    )
  }

  handleClick(e) {
    const className = e.currentTarget.className
    let data

    if (className === this.sortedBy) {
      data = this.sort(className, true)
      this.sortedBy = className + ' reverse'
    } else {
      data = this.sort(className)
      this.sortedBy = className
    }

    this.props.update(data)
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
