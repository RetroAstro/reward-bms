import React from 'react'
import bus from '@utils/bus'

const Publish = ({ mark }) => {
  var text
  bus.on('save', function () {
    this.emit(mark, {
      push_message: text.value
    })
  }, mark)
  bus.on('show', function (data) {
    var t = mark.split('-')[1]
    data[`${t}list`].map((item) => {
      if (item.mark === mark) {
        text.value = item.push_message
      }
    })
  }, mark)
  return (
    <div className="publish">
      <div className="name">编辑推送信息</div>
      <textarea
        ref={el => { text = el }}
        className="pub-area"
      >
      </textarea>
    </div>
  )
}

export default Publish
