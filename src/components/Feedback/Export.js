import React, { Component } from 'react'
import Xlsx from 'xlsx'
import { showType, showUntype, showAll } from '../../api'
import bus from '@utils/bus'

class Export extends Component {
  handleExport () {
    bus.on('receiveType', (type) => {
      bus.removeAll('receiveType')
      this.fetchData(type)
        .then(({ items }) => {
          items.length ? this.exportExcel(type, items) : alert('没有数据可以导出哦 😊')
        })
    })
    bus.emit('getType')
  }
  fetchData (type) {
    const MAX = 666666
    var actid = this.props.actid
    return type === '指定类型'
      ? showType(actid, 0, MAX) : type === '非指定类型'
        ? showUntype(actid, 0, MAX) : type === '全部类型' ? showAll(actid) : null
  }
  exportExcel (
    filename,
    body,
    headers = [
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
  ) {
    var _headers = headers
      .map((v, i) => Object.assign({}, { v, position: String.fromCharCode(65 + i) + 1 }))
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {})
    var _body = body
      .map((v, i) => headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) })))
      .reduce((prev, next) => prev.concat(next))
      .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {})
    var output = Object.assign({}, _headers, _body)
    var outputPos = Object.keys(output)
    var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
    var wb = {
      SheetNames: ['mySheet'],
      Sheets: {
        'mySheet': Object.assign({}, output, { '!ref': ref })
      }
    }
    Xlsx.writeFile(wb, `${filename}.xlsx`, { bookType: 'xlsx', bookSST: false, type: 'binary', cellStyles: true })
  }
  s2ab (s) {
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length)
      let view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    } else {
      let buf = new Array(s.length)
      for (let i = 0; i !== s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff
      return buf
    }
  }
  render () {
    return (
      <div className="export-wrap flex-center">
        <div
          className="export flex-center"
          onClick={() => this.handleExport()}
        >
          <span>导出</span>
        </div>
      </div>
    )
  }
}

export default Export
