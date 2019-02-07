import React from 'react'
import { withRouter } from 'react-router-dom'
import Header from './Header'
import Main from './Main'

import './success.scss'

const Success = (props) => {
  var params = new URLSearchParams(props.location.search)
  var acname = params.get('acname')
  return (
    <div className="success">
      <Header
        acname={acname}
        history={props.history}
      />
      <Main acname={acname} />
    </div>
  )
}

export default withRouter(Success)
