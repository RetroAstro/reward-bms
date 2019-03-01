import React, { Component } from 'react'
import { Spring, animated } from 'react-spring/renderprops'

const Slider = ({ show, children }) => (
  <Spring
    native
    force
    from={{ x: 100 }}
    to={{ x: show ? 0 : 100 }}
  >
    {
      ({ x }) => (
        <animated.div
          className="history"
          style={{
            ...styles.history,
            transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
          }}
        >{children}</animated.div>
      )
    }
  </Spring>
)

export default class History extends Component {
  _renderContainer () {
    return (
      <div
        style={styles.container}
        className="container"
      >
        <ul style={styles.ul}>
          <li
            style={styles.box}
            className="flex-between"
          >
            <div className="flex-center">
              <span>最美班级墙</span>
            </div>
            <div className="del-btn flex-center">
              <i
                style={styles.icon}
                className="bg-cover-all"
              ></i>
            </div>
          </li>
          <li
            style={styles.box}
            className="flex-between"
          >
            <div className="flex-center">
              <span>拉拉队大比拼</span>
            </div>
            <div className="del-btn flex-center">
              <i
                style={styles.icon}
                className="bg-cover-all"
              ></i>
            </div>
          </li>
        </ul>
      </div>
    )
  }
  _renderButton () {
    return (
      <div
        style={styles.close}
        className="close-btn flex-center"
        onClick={() => this.props.hideModal()}
      >
        <span>返回主页</span>
      </div>
    )
  }
  render () {
    return (
      <Slider
        {...this.props}
      >
        {this._renderContainer()}
        {this._renderButton()}
      </Slider>
    )
  }
}

const styles = {
  history: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: '#f4f5f5'
  },
  close: {
    position: 'absolute',
    bottom: '40px',
    right: '40px',
    width: '40px',
    height: '90px',
    writingMode: 'vertical-lr',
    cursor: 'pointer',
    color: '#34495e',
    background: '#fff',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 21, 41, 0.12) 0 2px 6px'
  },
  container: {
    margin: 'auto',
    width: '700px'
  },
  box: {
    width: '100%',
    height: '50px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
    paddingLeft: '20px',
    paddingRight: '12px',
    cursor: 'pointer'
  },
  ul: {
    position: 'relative',
    marginTop: '50px'
  },
  icon: {
    width: '18px',
    height: '18px',
    backgroundImage: `url(${require('../../assets/close.png')})`
  }
}
