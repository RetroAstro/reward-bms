import React from 'react'

const Box = (props) => (
  <div className="save-wrap flex-center">
    <div className="save-box flex-col-between">
      <div className="qr-code bg-cover-all">
      </div>
      <div
        className="save-btn"
        onClick={() => props.handleClick()}
      >
        <span className="translate-center">
          点击查看
        </span>
      </div>
    </div>
  </div>
)

export default Box
