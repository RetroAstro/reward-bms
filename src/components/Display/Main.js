import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Subscribe } from 'unstated'
import QRcode from 'qrcode'
import AcBox from './AcBox'
import Save from '../../common/Save'
import bus from '@utils/bus'
import local from '@utils/local'

class Main extends Component {
  state = {
    qrcodeList: []
  }
  showQRcodes = (acname) => {
    this.ref.current.classList.add('active')
    var list = local.getLocal('qrcodeList')
    list.map((item) => {
      if (item.acname === acname) {
        (
          async () => {
            var result = await Promise.all(
              item.qrlist
                .map(({ url, prize }) => (
                  async () => {
                    var qrurl = await QRcode.toDataURL(url)
                    return {
                      prize,
                      url: qrurl,
                      acname: item.acname
                    }
                  }
                )())
            )
            this.setState({
              qrcodeList: result
            })
          }
        )()
      }
    })
  }
  showBoxes (list) {
    var acbox = this.props.shared
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
            <Subscribe to={[this.props.shared]}>
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
            handleClick={(e) => {
              if (e.target && !e.target.matches('.photo, .photo *')) {
                this.ref.current.classList.remove('active')
              }
              if (e === 'bingo') {
                this.ref.current.classList.remove('active')
              }
            }}
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
