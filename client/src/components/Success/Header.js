import React from 'react'
import { withRouter } from 'react-router-dom'

const Header = ({ history }) => (
  <div className="header flex-center">
    <div className="middle flex-between">
      <div className="ac-name flex-center">
        <span>最美班级墙</span>
      </div>
      <div
        className="back flex-center"
        onClick={() => history.push('/display')}
      >
        <span>返回主页</span>
      </div>
    </div>
  </div>
)

export default withRouter(Header)
