import React from 'react'
import { HashRouter as Router, Route, Redirect } from 'react-router-dom'
import routes from './routes'

const Auth = () => document.cookie.includes('isLogined')

const DynamicRoute = route => (
  <Route
    exact
    path={route.path}
    render={({ location, ...rest }) => (
      location.pathname !== '/' && !Auth()
        ? <Redirect to='/' /> : <route.component {...rest} />
    )}
  />
)

const View = () => (
  <Router>
    <>
      {
        routes.map((route, i) => (
          <DynamicRoute key={i} {...route} />
        ))
      }
    </>
  </Router>
)

export default View
