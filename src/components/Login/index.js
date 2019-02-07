import React from 'react'
import { withRouter } from 'react-router-dom'
import { Subscribe } from 'unstated'
import Submit from './Submit'
import SubmitContainer from '@cont/Submit'

import './login.scss'

const Login = ({ history }) => (
  <div className="container translate-center">
    <Subscribe to={[SubmitContainer]}>
      {submit => <Submit history={history} submit={submit} />}
    </Subscribe>
  </div>
)

export default withRouter(Login)
