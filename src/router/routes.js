import { Login, Display, Create, Success, Feedback } from './lazy'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/display',
    component: Display
  },
  {
    path: '/create',
    component: Create
  },
  {
    path: '/success',
    component: Success
  },
  {
    path: '/feedback',
    component: Feedback
  }
]

export default routes
