import React, { Component } from 'react'
import Nav from './Nav'
import Table from './Table'
import Pagination from './Pagination'

class Feed extends Component {
  state = {

  }
  render () {
    return (
      <div className="feed">
        <Nav />
        <Table />
        <Pagination totalPage={50} />
      </div>
    )
  }
}

export default Feed
