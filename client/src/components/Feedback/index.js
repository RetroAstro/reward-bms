import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from './Header'
import Feed from './Feed'
import Export from './Export'

import './feedback.scss'

const Feedback = (props) => {
  var params = new URLSearchParams(props.location.search)
  var actid = params.get('actid')
  var acname = params.get('acname')
  return (
    <div className="feedback">
      <Header
        actid={actid}
        acname={acname}
        history={props.history}
      />
      <Feed actid={actid} />
      <Export />
    </div>
  )
}

export default withRouter(Feedback)
