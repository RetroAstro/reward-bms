import React, { Component } from 'react'
import classNames from 'classnames'
import Xlsx from 'xlsx'
import bus from '@utils/bus'

class Upload extends Component {
    state = {
      status: '点击上传',
      list: [],
      flag: true
    }
    init () {
      var mark = this.props.mark
      bus.on('save', () => {
        bus.emit(mark, {
          student_list: this.state.list
        })
      }, mark)
      bus.on('show', (data) => {
        var t = mark.split('-')[1]
        data[`${t}list`].map((item) => {
          if (item.mark === mark && item.student_list.length) {
            this.setState({
              status: '已上传',
              list: item.student_list,
              flag: false
            })
          }
        })
      }, mark)
    }
    formatData (data) {
      console.log(data)
      return data
    }
    readFile = (e) => {
      var file = e.target.files[0]
      var arr = file.name.split('.')
      if (arr[arr.length - 1] !== 'xlsx') {
        alert('请上传 Excel 文件！')
        return
      }
      var reader = new FileReader()
      reader.addEventListener('load', (e) => {
        var result = e.target.result
        var wb = Xlsx.read(result, { type: 'binary' })
        this.setState({
          status: '已上传',
          list: this.formatData(
            Xlsx.utils
              .sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          ),
          flag: false
        })
      })
      reader.readAsBinaryString(file)
      this.setState({
        status: '上传中...',
        flag: false
      })
    }
    render () {
      var file_input
      if (this.state.flag) this.init()
      return (
        <div className="upload flex-start">
          <div className="name">名单上传</div>
          <div
            className={classNames(
              'upload-btn',
              'flex-center',
              { disabled: this.state.status === '已上传' }
            )}
            onClick={() => file_input.click()}
          >
            <span>{this.state.status}</span>
          </div>
          <input
            type="file"
            onChange={this.readFile}
            className="file-ipt"
            ref={el => { file_input = el }}
          />
        </div>
      )
    }
}

export default Upload
