import React from 'react'
import classNames from 'classnames'
import { deleteAct } from '../../apis'
import local from '@utils/local'

const deleteActivity = ({ actid, acname, acbox }) => {
  var datalist = local.getLocal('dataList')
  var qrcodelist = local.getLocal('qrcodeList')
  datalist = datalist.filter(item => item.acname !== acname)
  qrcodelist = qrcodelist.filter(item => item.acname !== acname)
  local.setLocal('dataList', datalist)
  local.setLocal('qrcodeList', qrcodelist)
  deleteAct(actid, acname)
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
        {/* <div className="ac-create-time">
                10月29日
        </div> */}
      </div>
    </div>
    <div className={classNames(
      'ac-bottom',
      props.status !== 2 ? 'flex-between' : 'flex-center'
    )}>
      { props.status !== 2
        ? <>
      <div
        className="end-btn flex-center"
        onClick={() => deleteActivity(props)}
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
        : <div
          className="edit-btn flex-center"
          onClick={() => props.history.push(`/create?acname=${props.acname}`)}
        >
          <span>继续编辑</span>
        </div>
      }
    </div>
  </div>
)

export default AcBox
