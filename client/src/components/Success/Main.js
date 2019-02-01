import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Box from './Box'
import Fail from './Fail'
import Save from '../../common/Save'
import local from '@utils/local'

class Main extends Component {
  state = {
    qrcodeList: []
  }
  showQRcodes = () => {
    this.ref.current.classList.add('active')
    var list = local.getLocal('qrcodeList')
    list.map((item) => {
      if (item.acname === this.acname) {
        this.setState({
          qrcodeList: item.qrlist
        })
      }
    })
  }
  componentDidMount () {
    var params = new URLSearchParams(this.props.location.search)
    this.acname = params.get('acname')
  }
  render () {
    this.ref = React.createRef()
    return (
      <div className="main">
        <Box
          handleClick={this.showQRcodes}
        />
        <Fail />
        <Save
          ref={this.ref}
          qrcodeList={this.state.qrcodeList}
          handleClick={() => this.ref.current.classList.remove('active')}
        />
      </div>
    )
  }
}

export default withRouter(Main)
