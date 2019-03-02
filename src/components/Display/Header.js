import React from 'react'
import { loginOut } from '../../api'
import local from '@utils/local'

var wrap

const Header = ({ shared }) => (
  <div className="header flex-center">
    <div className="middle flex-between">
      <div className="orz-name">红岩网校工作站</div>
      <div
        ref={el => { wrap = el }}
        className="search-wrap flex-between"
      >
        <input
          type="text"
          className="search-ipt"
          placeholder="请输入活动关键字"
          onKeyUp={(e) => {
            var value = e.target.value
            if (value) {
              shared.filterBox(value)
            } else {
              var list = local.getLocal('dataList')
              shared
                .clearAll()
                .then(() => {
                  var data = list.map((item) => ({
                    actid: item.actid,
                    acname: item.acname,
                    status: item.status
                  }))
                  shared.addBox(data)
                })
            }
          }}
          onBlur={() => wrap.classList.remove('active')}
          onFocus={() => wrap.classList.add('active')}
        />
        <div className="search-btn flex-center">
          <i className="bg-cover-all"></i>
        </div>
      </div>
      <div
        className="sign-out-btn flex-center"
        onClick={async () => {
          await loginOut()
          var exp = new Date()
          exp.setTime(exp.getTime() - 1)
          document.cookie = `isLogined='';expires=${exp.toGMTString()}`
          window.location.reload()
          local.setLocal('token', null)
        }}
      >
        <span>退出当前账号</span>
      </div>
    </div>
  </div>
)

export default Header
