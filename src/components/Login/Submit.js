import React, { Component } from 'react'
import classNames from 'classnames'

class Submit extends Component {
  state = {
    status: false
  }
  handleSubmit = () => {
    const { submit } = this.props
    if (this.orz.value === '') this.orz_err.classList.add('active')
    if (this.psw.value === '') this.psw_err.classList.add('active')
    this.orz.value && this.psw.value && submit.login({
      username: this.orz.value,
      password: this.psw.value
    })
    setTimeout(() => this.setState({ status: true }), 300)
  }
  componentDidMount () {
    window.onkeyup = e => e.keyCode === 13 ? this.handleSubmit() : null
  }
  componentWillUnmount () {
    window.onkeyup = null
  }
  async componentDidUpdate () {
    var { submit, history } = this.props
    if (submit.state.status === 0 && this.state.status) {
      await submit.reset()
      history.push('/display')
    }
    if (submit.state.status === 1 && this.state.status) {
      await submit.reset()
      alert('该用户已登录，请稍后再试！')
    }
  }
  render () {
    const { submit } = this.props
    return (
      <>
      <div className="title">领奖工具后台管理系统</div>
      <div className="input-wrap flex-col-between">
        <input
          ref={el => { this.orz = el }}
          className="orz"
          type="text"
          placeholder="请输入组织名称"
          onFocus={async () => {
            await submit.reset()
            this.orz_err.classList.remove('active')
            this.setState({ status: false })
          }}
        />
        <input
          ref={el => { this.psw = el }}
          className="psw"
          type="text"
          placeholder="请输入密码"
          onFocus={async () => {
            await submit.reset()
            this.psw_err.classList.remove('active')
            this.setState({ status: false })
          }}
        />
        <span className="orz-err" ref={el => { this.orz_err = el }}>组织名称不能为空!</span>
        <span className="psw-err" ref={el => { this.psw_err = el }}>密码不能为空!</span>
      </div>
      <div className="login-btn" onClick={this.handleSubmit}>
        <span className="translate-center">登录</span>
        <div
          className={
            classNames(
              'login-failed',
              { show: this.state.status },
              { active: submit.state.status === -3 || submit.state.status === -4 }
            )
          }>{submit.state.status === -3 ? '组织名称不存在！' : submit.state.status === -4 ? '密码输入错误！' : null}</div>
      </div>
    </>
    )
  }
}

export default Submit
