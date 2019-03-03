import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { Spring, animated } from 'react-spring/renderprops'
import { deleteAct } from '../../api'
import local from '@utils/local'

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

class History extends PureComponent {
  state = {
    items: []
  }
  onDelete ({ actid, acname }) {
    deleteAct(actid)
    var items = this.state.items.filter(item => acname !== item.acname)
    local.setLocal('historyList', items)
    this.setState({ items })
  }
  componentDidUpdate (prevProps) {
    if (!prevProps.show) {
      var items = local.getLocal('historyList')
      this.setState({ items })
    }
  }
  render () {
    const { items } = this.state
    return (
      <Slider
        {...this.props}
      >
        <div
          style={styles.container}
          className="container"
        >
          <ul style={styles.wrap}>
            {
              items.length ? (
                items.map((item, i) => (
                  <li
                    key={i}
                    style={styles.box}
                    className="flex-between"
                    onClick={(e) => {
                      if (e.target && e.target.matches('.del-btn, .del-btn *')) {
                        this.onDelete(item)
                      } else {
                        this.props.history.push(`/feedback?acname=${item.acname}&actid=${item.actid}`)
                      }
                    }}
                  >
                    <div className="flex-center">
                      <span>{item.acname}</span>
                    </div>
                    <div
                      className="del-btn flex-center"
                    >
                      <i
                        style={styles.icon}
                        className="bg-cover-all"
                      ></i>
                    </div>
                  </li>
                ))
              ) : <span className="flex-center">暂时还没有历史活动出现呢 ～</span>
            }
          </ul>
        </div>
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
  wrap: {
    position: 'relative',
    marginTop: '50px',
    overflow: 'hidden'
  },
  icon: {
    width: '18px',
    height: '18px',
    backgroundImage: `url(${require('../../assets/close.png')})`
  }
}

export default withRouter(History)
