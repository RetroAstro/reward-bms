import React, { Component } from 'react'
import QRcode from 'qrcode'
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
      if (item.acname === this.props.acname) {
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

export default Main
