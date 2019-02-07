import React from 'react'
import bus from '@utils/bus'
import { Context } from './Context'

const Delete = ({ mark }) => (
  <div className="delete flex-end">
    <Context.Consumer>
      {(deleteBox) => (
        <div
          className="del flex-center"
          onClick={() => {
            deleteBox(mark)
            bus.remove(mark, mark)
            bus.remove('save', mark)
          }}
        >
          <span>删除此类型</span>
        </div>
      )}
    </Context.Consumer>
  </div>
)

export default Delete
