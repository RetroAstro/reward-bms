import React from 'react'

const Header = ({ acname, history }) => (
  <div className="header flex-center">
    <div className="middle flex-between">
      <div className="ac-name flex-center">
        <span>{acname}</span>
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

export default Header
