import React from 'react'

const initial = new Array(13).fill(0)

const arr = [
  '1',
  '指定类型',
  '肖畅',
  '计算机学院',
  '2017212786',
  '17784458637',
  '马克杯',
  '推送成功',
  '已领取'
]

const Table = () => (
  <div className="table-box">
    <ul className="table-list table-row">
      {
        initial.map((row, i) =>
          <li className="table-row" key={i}>
            {
              arr.map((item, i) =>
                <div className="flex-center" key={i}>
                  <span>{item}</span>
                </div>
              )
            }
          </li>
        )
      }
    </ul>
  </div>
)

export default Table
