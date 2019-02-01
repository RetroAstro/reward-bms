import React from 'react'
import classNames from 'classnames'

const arr = ['type', 'untype']

const Choose = (props) => (
  <div className={classNames(
    'shadow-box',
    'choose',
    { active: props.active }
  )}>
    <div className="choose-box flex-col-between">
      <div className="title">请选择领奖类型</div>
      <div className="type-wrap flex-between">
        {
          arr.map((item, i) =>
            <div
              key={i}
              className="flex-center"
              onClick={() => props.handleChoose(item)}
            >
              <span>{item === 'type' ? '指定类型' : '非指定类型'}</span>
            </div>
          )
        }
      </div>
    </div>
  </div>
)

export default Choose
