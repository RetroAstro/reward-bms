import React from 'react'
import Award from './Award'
import Delete from './Delete'
import bus from '@utils/bus'

const UnTypeBox = React.memo((props) => {
  var mark = props.mark
  bus.on(mark, function (val) {
    val.mark = mark
    this.data.untypelist.push(val)
  })
  return (
    <div className="type-box">
      <Award type="非指定类型" {...props} />
      <Delete {...props} />
    </div>
  )
})

export default UnTypeBox
