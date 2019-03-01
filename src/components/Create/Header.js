import React from 'react'
import { withRouter } from 'react-router-dom'
import { saveEdit } from '../../api'
import bus from '@utils/bus'
import local from '@utils/local'

const validate = (bus, list) => {
  if (!bus.data.acname) {
    alert('请输入活动名称！')
    return false
  }
  var isRepeat = list.some(item => item.acname === bus.data.acname && item.status === 1)
  if (isRepeat) {
    alert('该活动已经被创建！')
    return false
  }
  if (!bus.data.typelist.length && !bus.data.untypelist.length) {
    alert('请创建奖品类型！')
    return false
  }
  return true
}

const savetoLocal = (history) => {
  var list = local.getLocal('dataList')
  bus.emit('save')
  var pass = validate(bus, list)
  if (!pass) {
    bus.init()
  } else {
    list = list.filter(item => item.acname !== bus.data.acname)
    bus.data.status = 2
    saveEdit(bus.data)
    local.setLocal('dataList', [...list, bus.data])
    bus.init()
    bus.clear()
    bus.removeAll('show')
    history.push('/display')
  }
}

const Header = (props) => (
  <div className="header flex-center">
    <div className="middle flex-between">
      <div className="create-name">领奖活动创建</div>
      <div
        className="save-btn flex-center"
        onClick={() => savetoLocal(props.history)}
      >
        <span>保存编辑</span>
      </div>
    </div>
  </div>
)

export default withRouter(Header)
