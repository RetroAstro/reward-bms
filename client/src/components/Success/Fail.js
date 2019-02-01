import React from 'react'
import Nav from './Nav'
import Table from './Table'

const Fail = () => (
  <div className="fail">
    <div className="mes flex-start">
      <span>推送失败信息</span>
    </div>
    <Nav />
    <Table />
  </div>
)

export default Fail
