import Loadable from 'react-loadable'
import Loading from '../common/Loading'

export const Login = Loadable({
  loader: () => import('@comp/Login'),
  loading: Loading
})

export const Display = Loadable({
  loader: () => import('@comp/Display'),
  loading: Loading
})

export const Create = Loadable({
  loader: () => import('@comp/Create'),
  loading: Loading
})

export const Success = Loadable({
  loader: () => import('@comp/Success'),
  loading: Loading
})

export const Feedback = Loadable({
  loader: () => import('@comp/Feedback'),
  loading: Loading
})
