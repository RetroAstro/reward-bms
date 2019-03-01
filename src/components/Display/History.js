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
          className="history flex-center"
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
  render () {
    return (
      <Slider
        {...this.props}
      >
        <div
          style={styles.close}
          className="close-btn flex-center"
          onClick={() => this.props.hideModal()}
        >
          <span>返回主页</span>
        </div>
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
    background: '#fff'
  },
  close: {
    width: '90px',
    height: '40px',
    cursor: 'pointer',
    color: '#34495e',
    borderRadius: '4px',
    boxShadow: 'rgba(0, 21, 41, 0.12) 0 2px 6px'
  }
}
