import React, { Component } from 'react'
import classNames from 'classnames'

class Pagination extends Component {
  state = {
    currentPage: 1
  }
  pageClick (current) {
    this.setState({
      currentPage: current
    })
  }
  createPages () {
    var startPage, endPage
    var pages = []
    var forward = 2
    var { currentPage } = this.state
    var { totalPage } = this.props
    var left = currentPage - forward
    var right = currentPage + forward
    pages.push(
      <li
        key={'la'}
        className="flex-center l-arrow"
        onClick={() => {
          this.setState((prevState) => {
            return prevState.currentPage < 2
              ? { currentPage: 1 } : { currentPage: prevState.currentPage - 1 }
          })
        }}
      >
        <span></span>
      </li>
    )
    pages.push(
      <li
        key={1}
        className={classNames(
          'flex-center',
          { active: currentPage === 1 }
        )}
        onClick={() => this.pageClick(1)}
      >
        <span>1</span>
      </li>
    )
    if (left > 2) {
      pages.push(
        <li key={'.l'} className="flex-center eli">
          <span className="bg-cover-all"></span>
        </li>
      )
    }
    if (left >= 2) {
      startPage = left
    } else {
      startPage = 2
    }
    if (right < totalPage) {
      endPage = right
    } else {
      endPage = totalPage - 1
    }
    if (left < 2) {
      startPage = 2
      endPage = 2 * forward + 1
    }
    if (right >= totalPage) {
      endPage = totalPage - 1
      startPage = endPage - forward
    }
    for (var i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={classNames(
            'flex-center',
            { active: currentPage === i }
          )}
          onClick={this.pageClick.bind(this, i)}
        >
          <span>{i}</span>
        </li>
      )
    }
    if (right < totalPage - 1) {
      pages.push(
        <li
          key={'.r'}
          className="flex-center eli"
        >
          <span className="bg-cover-all"></span>
        </li>
      )
    }
    pages.push(
      <li
        key={totalPage}
        className={classNames(
          'flex-center',
          { active: currentPage === totalPage }
        )}
        onClick={() => this.pageClick(totalPage)}
      >
        <span>{totalPage}</span>
      </li>
    )
    pages.push(
      <li
        key={'ra'}
        className="flex-center r-arrow"
        onClick={() => {
          this.setState((prevState) => {
            return prevState.currentPage + 1 > totalPage
              ? { currentPage: totalPage } : { currentPage: prevState.currentPage + 1 }
          })
        }}
      >
        <span></span>
      </li>
    )
    if (totalPage <= 5) {
      var arr = []
      for (var j = 1; j <= totalPage; j++) {
        arr.push(
          <li
            key={j}
            className={classNames(
              'flex-center',
              { active: currentPage === j }
            )}
            onClick={this.pageClick.bind(this, j)}
          >
            <span>{j}</span>
          </li>
        )
      }
      if (totalPage > 3) {
        var first = pages.shift()
        var last = pages.pop()
        arr.unshift(first)
        arr.push(last)
      }
      pages = arr
    }
    return pages
  }
  render () {
    var pages = this.createPages()
    return (
      <div className="pagination flex-center">
        <ul className="page-wrap flex-between">
          {pages}
        </ul>
      </div>
    )
  }
}

export default Pagination
