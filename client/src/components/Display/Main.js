import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Subscribe } from 'unstated'
import AcBox from './AcBox'
import Save from '../../common/Save'
import bus from '@utils/bus'
import local from '@utils/local'
import AcBoxContainer from '@cont/AcBox'

const sharedAcBoxContainer = new AcBoxContainer()

class Main extends Component {
  state = {
    qrcodeList: []
  }
  showQRcodes = (acname) => {
    this.ref.current.classList.add('active')
    var list = local.getLocal('qrcodeList')
    list.map((item) => {
      if (item.acname === acname) {
        this.setState({
          qrcodeList: item.qrlist
        })
      }
    })
  }
  showBoxes (list) {
    var acbox = sharedAcBoxContainer
    if (list.length) {
      acbox
        .clearAll()
        .then(() => {
          var data = list.map((item) => ({
            actid: item.actid,
            acname: item.acname,
            status: item.status
          }))
          acbox.addBox(data)
        })
    }
  }
  componentDidMount () {
    var list = local.getLocal('dataList')
    this.showBoxes(list)
    bus.on('renderInitialList', list => this.showBoxes(list))
  }
  componentWillMount () {
    bus.removeAll('waitData')
  }
  render () {
    this.ref = React.createRef()
    return (
      <div className="main">
        <div className="section">
          <div className="sec-row flex-start">
            <Subscribe to={[sharedAcBoxContainer]}>
              {(acbox) => (
                acbox.state.acboxlist.length
                  ? acbox.state.acboxlist.map((box, i) => (
                    <AcBox
                      {...box}
                      key={i}
                      acbox={acbox}
                      history={this.props.history}
                      handleClick={this.showQRcodes}
                    />
                  )) : null
              )}
            </Subscribe>
          </div>
          <Save
            ref={this.ref}
            qrcodeList={this.state.qrcodeList}
            handleClick={() => this.ref.current.classList.remove('active')}
          />
        </div>
        <div
          className="create"
          onClick={() => this.props.history.push('/create')}
        ></div>
      </div>
    )
  }
}

export default withRouter(Main)
