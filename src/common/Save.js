import React, { Component } from 'react'
import html2canvas from 'html2canvas'

class Save extends Component {
  downloadImage (dom, next) {
    var filename = dom.getAttribute('filename')
    var opts = {
      logging: false,
      width: dom.offsetWidth,
      height: dom.offsetHeight,
      dpi: window.devicePixelRatio
    }
    html2canvas(dom, opts)
      .then((canvas) => {
        var url = canvas.toDataURL()
        var ele = document.createElement('a')
        ele.href = url
        ele.download = filename
        ele.style.display = 'none'
        document.body.append(ele)
        ele.click()
        setTimeout(() => next(), 1500)
      })
  }
  compose (middlewares) {
    var i = -1
    var next = () => {
      i++
      if (i < middlewares.length) {
        middlewares[i](next)
      } else {
        this.props.handleClick()
      }
    }
    next()
  }
  download = () => {
    var photos = document.querySelectorAll('.photo-box .photo')
    var middlewares = []
    photos.forEach(dom => middlewares.push(next => this.downloadImage(dom, next)))
    this.compose(middlewares)
  }
  render () {
    return (
      <div
        ref={this.props.myRef}
        style={{ backgroundColor: '#f4f5f5' }}
        className="shadow-box mask"
      >
        <div className="center">
          <div className="save-box flex-end">
            <div
              className="save-btn flex-center"
              onClick={this.download}
            >
              <span>一键保存</span>
            </div>
          </div>
          <div className="photo-box">
            <ul className="photo-list">
              {
                this.props.qrcodeList.length
                  ? this.props.qrcodeList.map((item, i) => (
                    <li
                      key={i}
                      filename={item.prize}
                      className="photo flex-col-start"
                    >
                      <div className="prize-name flex-center">
                        <span>{item.prize}</span>
                      </div>
                      <div className="qrcode-box flex-center">
                        <div
                          className="qrcode bg-cover-all"
                          style={{ backgroundImage: `url(${item.url})` }}
                        >
                        </div>
                      </div>
                      <div className="acname flex-center">
                        <span>{item.acname}</span>
                      </div>
                    </li>
                  )) : null
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

const forwardRef = (props, ref) => <Save {...props} myRef={ref} />

export default React.forwardRef(forwardRef)
