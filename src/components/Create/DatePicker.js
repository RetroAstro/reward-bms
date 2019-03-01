import React from 'react'
import bus from '@utils/bus'

const getDate = () => {
  var date = new Date()
  var m = date.getMonth() + 1
  var d = date.getDate()
  var month = m < 10 ? '0' + m : m
  var day = d < 10 ? '0' + d : d
  var today = `${date.getFullYear()}-${month}-${day}`
  return today
}

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
    var date
    if (start.value && end.value) {
      date = `${start.value} ~ ${end.value}`
    } else if (!start.value && end.value) {
      date = `${getDate()} ~ ${end.value}`
    } else {
      date = null
    }
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
          placeholder={getDate()}
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
