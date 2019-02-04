import React, { Component } from 'react'
import Nav from './Nav'
import Table from './Table'
import Pagination from './Pagination'
import { showType, showUntype } from '../../apis'
import bus from '@utils/bus'

class Feed extends Component {
  state = {
    items: [],
    total: 0
  }
  componentDidMount () {
    this.type = '全部类型'
    bus.on('watchType', (type) => {
      this.type = type
      if (type === '指定类型') {
        showType(this.props.actid, 0)
          .then(data => {
            this.setState({
              items: data.items,
              total: data.total
            })
          })
      } else if (type === '非指定类型') {
        showUntype(this.props.actid, 0)
          .then(data => {
            this.setState({
              items: data.items,
              total: data.total
            })
          })
      }
    })
  }
  componentWillUnmount () {
    bus.removeAll('watchType')
  }
  handleChange (current) {
    var num = current - 1
    if (this.type === '指定类型') {
      showType(this.props.actid, num)
    } else if (this.type === '非指定类型') {
      showUntype(this.props.actid, num)
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
