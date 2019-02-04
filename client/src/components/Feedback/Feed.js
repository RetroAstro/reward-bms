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
    var actid = this.props.actid
    bus.on('watchType', (type) => {
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
      }
    })
  }
  componentWillUnmount () {
    bus.removeAll('watchType')
  }
  render () {
    return (
      <div className="feed">
        <Nav />
        <Table items={this.state.items} />
        <Pagination totalPage={this.state.total} />
      </div>
    )
  }
}

export default Feed
