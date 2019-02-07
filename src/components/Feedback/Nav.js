import React from 'react'

const arr = [
  '序号',
  '领奖类型',
  '姓名',
  '学院',
  '学号',
  '电话',
  '奖品名称',
  '推送情况',
  '领奖情况'
]

const Nav = () => (
  <div className="feed-nav">
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
