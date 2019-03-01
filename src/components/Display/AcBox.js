import React from 'react'
import { endAct, deleteTemp } from '../../api'
import local from '@utils/local'

const handleActivity = ({ actid, acname, acbox, status }) => {
  var datalist = local.getLocal('dataList')
  var qrcodelist = local.getLocal('qrcodeList')
  datalist = datalist.filter(item => item.acname !== acname)
  qrcodelist = qrcodelist.filter(item => item.acname !== acname)
  local.setLocal('dataList', datalist)
  local.setLocal('qrcodeList', qrcodelist)
  status === 2 ? deleteTemp(actid) : status === 1 ? endAct(actid) : null
  acbox.deleteBox(acname)
}

const AcBox = (props) => (
  <div className="ac-box">
    <div className="ac-top flex-between">
      <div className="state">{ props.status !== 2 ? '进行中' : '已保存' }</div>
      { props.status !== 2
        ? <div
          className="qrcode bg-cover-all"
          onClick={() => props.handleClick(props.acname)}
        ></div> : null
      }
    </div>
    <div className="ac-middle flex-center">
      <div className="ac-info flex-col-between">
        <div className="ac-name">{props.acname}</div>
      </div>
    </div>
    <div className="ac-bottom flex-between">
      { props.status !== 2
        ? <>
      <div
        className="end-btn flex-center"
        onClick={() => handleActivity(props)}
      >
        <span>结束活动</span>
      </div>
      <div
        className="feedback-btn flex-center"
        onClick={() => props.history.push(`/feedback?acname=${props.acname}&actid=${props.actid}`)}
      >
        <span>信息反馈</span>
      </div>
        </>
        : <>
          <div
            className="end-btn flex-center"
            onClick={() => handleActivity(props)}
          >
            <span>删除活动</span>
          </div>
          <div
            className="edit-btn flex-center"
            onClick={() => props.history.push(`/create?acname=${props.acname}`)}
          >
            <span>继续编辑</span>
          </div>
        </>
      }
    </div>
  </div>
)

export default AcBox
