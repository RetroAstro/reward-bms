import React from 'react'

const arr = [
  '姓名',
  '学院',
  '学号',
  '电话',
  '领奖类型'
]

const Nav = (props) => (
  <div className="fail-nav">
    {
      arr.map((item, i) => (
        <div
          key={i}
          className="flex-center"
        >
          <span>{item}</span>
        </div>
      ))
    }
  </div>
)

export default Nav
