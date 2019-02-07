import React from 'react'
import Award from './Award'
import Upload from './Upload'
import DatePicker from './DatePicker'
import Publish from './Publish'
import Delete from './Delete'
import bus from '@utils/bus'

const TypeBox = React.memo((props) => {
  var boxInfo = []
  var mark = props.mark
  bus.on(mark, function (val) {
    boxInfo.push(val)
    if (boxInfo.length === 4) {
      var box = Object.assign({ mark }, ...boxInfo)
      this.data.typelist.push(box)
      boxInfo = []
    }
  })
  return (
    <div className="type-box">
      <Award type="指定类型" {...props} />
      <Upload {...props} />
      <DatePicker {...props} />
      <Publish {...props} />
      <Delete {...props} />
    </div>
  )
})

export default TypeBox
