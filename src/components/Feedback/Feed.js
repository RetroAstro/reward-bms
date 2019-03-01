import React, { Component } from 'react'
import Nav from './Nav'
import Table from './Table'
import Pagination from './Pagination'
import { showType, showUntype, showAll } from '../../api'
import bus from '@utils/bus'

class Feed extends Component {
  state = {
    items: [],
    total: 0
  }
  componentDidMount () {
    this.type = '全部类型'
    var actid = this.props.actid
    showAll(actid, 1)
      .then((data) => {
        this.setState({
          items: data.items,
          total: data.total
        })
      })
    bus.on('watchType', (type) => {
      this.type = type
      if (type === '指定类型') {
        showType(actid, 0)
          .then(data => {
            this.setState({
              items: data.items,
              total: data.total
            })
          })
      } else if (type === '非指定类型') {
        showUntype(actid, 0)
          .then(data => {
            this.setState({
              items: data.items,
              total: data.total
            })
          })
      } else if (type === '全部类型') {
        showAll(actid, 1)
          .then((data) => {
            this.setState({
              items: data.items,
              total: data.total
            })
          })
      }
    })
  }
  shouldComponentUpdate (nextProps, nextState) {
    if (nextState.items.length === this.state.items.length) {
      var len = this.state.items.length
      for (var i = 0; i < len; i++) {
        if (nextState.items[i]['学号'] !== this.state.items[i]['学号']) {
          return false
        }
      }
    }
    return true
  }
  componentWillUnmount () {
    bus.removeAll('watchType')
  }
  handleChange = (current) => {
    var actid = this.props.actid
    var num = current - 1
    if (this.type === '指定类型') {
      showType(actid, num)
    } else if (this.type === '非指定类型') {
      showUntype(actid, num)
    } else if (this.type === '全部类型') {
      showAll(actid, current)
    }
  }
  render () {
    return (
      <div className="feed">
        <Nav />
        <Table items={this.state.items} />
        <Pagination
          totalPage={this.state.total}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

export default Feed
