import React from 'react'
import PropTypes from 'prop-types'
import './SpecsTable.scss'

const parseResult = (result) => {
  let keys = []
  result.forEach((item) => {
    keys = keys.concat(Object.keys(item.specs))
  })

  let container = []
  keys.forEach((specTitle) => {
    container.push((
      <tr key={specTitle}>
        <td>{specTitle}</td>
        {
          result.map((item) => (
            <td>{item.specs[specTitle] || ''}</td>
          ))
        }
      </tr>
    ))
  })
  return container
}

const SpecsTable = (props) => props.result.length ? (
  <table className='table table-bordered'>
    <thead>
      <tr>
        <th>&nbsp;</th>
        {
          props.result.map((item, index) => (
            <th key={index}>{item.title}</th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {parseResult(props.result)}
    </tbody>
  </table>
) : (<div>&nbsp;</div>)

SpecsTable.propTypes = {
  result: PropTypes.array.isRequired
}

export default SpecsTable
