import React from 'react'

export default class Header extends React.Component {

  renderSortMarker(sortedBy, className) {
    let sort = sortedBy

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

  renderHeader(key, header) {
    const props     = this.props,
          sortedBy  = props.sortedBy,
          className = header[0]

    const sort        = props.sort,
          setSortedBy = props.setSortedBy

    return (
      <th
        key         = {key}
        className   = {className}
        data-field  = {className}
        onClick     = {(e) => {
          let data = undefined

          if (className === sortedBy) {
            data = sort(className, true)
            setSortedBy(className + ' reverse')
          } else {
            data = sort(className)
            setSortedBy(className)
          }

          props.update(data)
        }}
      >
        {header[1]}
        {this.renderSortMarker(sortedBy, className)}
        <div className = 'responsive-fix'></div>
      </th>
    )
  }

  render() {
    const props   = this.props,
          headers = props.headers

    return (
      <thead>
        <tr>
          {Object.keys(headers).map((key) => {
            return this.renderHeader(key, headers[key])
          })}
        </tr>
      </thead>
    )
  }
}
