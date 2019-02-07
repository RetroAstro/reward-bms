import React from 'react'
import bus from '@utils/bus'

const DatePicker = ({ mark }) => {
  function handleChange (e) {
    var value = e.target.value
    var hasEnglish = /[a-z]/i.test(value)
    if (hasEnglish) {
      e.target.value = ''
    }
  }
  var start, end
  bus.on('save', function () {
    var date = (start.value && end.value) ? `${start.value} ~ ${end.value}` : null
    this.emit(mark, {
      prize_date: date
    })
  }, mark)
  bus.on('show', function (data) {
    var t = mark.split('-')[1]
    data[`${t}list`].map((item) => {
      if (item.mark === mark && item.prize_date) {
        var arr = item.prize_date.split(' ~ ')
        start.value = arr[0]
        end.value = arr[1]
      }
    })
  }, mark)
  return (
    <div className="date-picker flex-start">
      <div className="name">兑奖时间</div>
      <div
        className="date"
        style={{ marginRight: '50px' }}
      >
        <input
          type="text"
          className="start-time"
          placeholder="开始时间"
          maxLength="10"
          ref={el => { start = el }}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <div className="date">
        <input
          type="text"
          className="end-time"
          placeholder="结束时间"
          maxLength="10"
          ref={el => { end = el }}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  )
}

export default DatePicker
