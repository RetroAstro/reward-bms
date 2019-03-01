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
      var defaultArr = [
        ['学号', 'stuid'],
        ['学院', 'college'],
        ['姓名', 'stuname'],
        ['电话', 'telephone']
      ]
      var result = data.map(item => {
        var obj = {}
        defaultArr.map(arr => {
          if (item[arr[0]]) {
            obj = Object.assign(obj, { [arr[1]]: item[arr[0]] })
          }
        })
        return obj
      })
      return result
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
          <div
            className="download-btn flex-center"
            onClick={() => this.example.click()}
          >
            <span>下载范例</span>
          </div>
          <a
            ref={el => { this.example = el }}
            href="http://zblade.top/accept_prize/file/standard.xlsx"
            download="上传名单范例"
            style={{
              display: 'none'
            }}
          />
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
