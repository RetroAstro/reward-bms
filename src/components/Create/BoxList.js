import React from 'react'
import TypeBox from './TypeBox'
import UnTypeBox from './UnTypeBox'

const BoxList = (props) => (
  <div className="type-box-list">
    {props.typelist.map((mark) => (
      <TypeBox
        key={mark}
        mark={mark}
      />
    ))}
    {props.untypelist.map((mark) => (
      <UnTypeBox
        key={mark}
        mark={mark}
      />
    ))}
  </div>
)

export default BoxList
