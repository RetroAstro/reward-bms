import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createAct } from '../../apis'
import bus from '@utils/bus'
import local from '@utils/local'

class Button extends Component {
  constructor (props) {
    super(props)
    this.ts = ['type', 'untype']
  }
  validate () {
    const isRepeat = () => {
      var list = local.getLocal('dataList')
      var repeat = list.some(item => item.acname === bus.data.acname && item.status === 1)
      return repeat
    }

    const isFull = () => {
      var check = this.ts
        .every(t => bus.data[`${t}list`]
          .every(item => Object.values(item)
            .every(val => Array.isArray(val) ? val.length : val)))

      if (this.ts.every(t => !bus.data[`${t}list`].length)) check = false

      return bus.data.acname && check
    }

    if (isRepeat()) {
      alert('该活动已被创建！')
      return false
    }
    if (!isFull()) {
      alert('请将信息填写完整！')
      return false
    }
    return true
  }
  savetoLocal (data) {
    var acname = bus.data.acname
    var datalist = local.getLocal('dataList')
    var qrcodelist = local.getLocal('qrcodeList')
    datalist = datalist.filter(item => item.acname !== acname)
    local.setLocal('dataList', [...datalist, bus.data])
    local.setLocal('qrcodeList', [...qrcodelist, { acname: acname, qrlist: data }])
    bus.init()
    bus.clear()
    bus.removeAll('show')
    this.props.history.push(`/success?acname=${acname}`)
  }
  handleCreate = () => {
    bus.emit('save')
    if (!this.validate()) {
      bus.init()
    } else {
      bus.data.status = 1
      createAct(bus.data).then(res => this.savetoLocal(res))
    }
  }
  render () {
    return (
      <div className="qr-create flex-center">
        <div
          className="qr-btn flex-center"
          onClick={this.handleCreate}
        >
          <span>生成二维码</span>
        </div>
      </div>
    )
  }
}

export default withRouter(Button)
