import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Nav from './Nav'
import BoxList from './BoxList'
import Button from './Button'
import Choose from './Choose'
import { Context } from './Context'
import bus from '@utils/bus'
import local from '@utils/local'

class Main extends Component {
  state = {
    show: false,
    typelist: [],
    untypelist: []
  }
  handleCreate = () => {
    this.setState({
      show: true
    })
  }
  handleChoose = (val) => {
    if (val === 'type') {
      this.setState({
        show: false,
        typelist: [...this.state.typelist, new Date().getTime() + '-' + val]
      })
    } else if (val === 'untype') {
      this.setState({
        show: false,
        untypelist: [...this.state.untypelist, new Date().getTime() + '-' + val]
      })
    }
  }
  deleteBox = (val) => {
    var t = val.split('-')[1]
    if (t === 'type') {
      this.setState({
        typelist: [...this.state.typelist.filter(item => item !== val)]
      })
    } else if (t === 'untype') {
      this.setState({
        untypelist: [...this.state.untypelist.filter(item => item !== val)]
      })
    }
  }
  componentDidMount () {
    var params = new URLSearchParams(this.props.location.search)
    var acname = params.get('acname')
    var list = local.getLocal('dataList')
    if (list.length) {
      list.map((item) => {
        if (item.acname === acname) {
          this.setState({
            typelist: item.typelist.map(box => box.mark),
            untypelist: item.untypelist.map(box => box.mark)
          }, () => {
            bus.emit('show', item)
          })
        }
      })
    }
  }
  render () {
    return (
      <div className="main">
        <Nav handleCreate={this.handleCreate} />
        <Context.Provider value={this.deleteBox} >
          <BoxList
            typelist={this.state.typelist}
            untypelist={this.state.untypelist}
          />
        </Context.Provider>
        <Button />
        <Choose
          active={this.state.show}
          handleChoose={this.handleChoose}
        />
      </div>
    )
  }
}

export default withRouter(Main)
