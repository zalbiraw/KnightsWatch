import React, { PropTypes } from 'react'

const renderHeader = (key, header, sortedBy, functions) => {
  const className = header[0]

  return (
    <th
      key         = {key}
      className   = {className}
      data-field  = {className}
      onClick     = {(e) => {
        let data = undefined

        if (className === sortedBy) {
          data = functions.sort(className, true)
          functions.setSortedBy(className + ' reverse')
        } else {
          data = functions.sort(className)
          functions.setSortedBy(className)
        }

        functions.update(data)
      }}
    >
      {header[1]}
      {renderSortMarker(sortedBy, className)}
      <div className = 'responsive-fix'></div>
    </th>
  )
}

const renderSortMarker = (sortedBy, className) => {
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

const Header = ({ headers, sortedBy, functions }) => (
  <thead>
    <tr>
      {Object.keys(headers).map((key) => {
        return renderHeader(key, headers[key], sortedBy, functions)
      })}
    </tr>
  </thead>
)

Header.propTypes = {
  headers: PropTypes.array.isRequired,
  sortedBy: PropTypes.string,
  functions: PropTypes.object.isRequired
}

export default Header
