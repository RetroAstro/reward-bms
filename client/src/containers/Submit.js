import { Container } from 'unstated'
import { requestLogin } from '../apis'
import local from '@utils/local'

class SubmitContainer extends Container {
  state = {
    status: ''
  }
  reset () {
    this.setState({ status: '' })
  }
  login (data) {
    requestLogin(data)
      .then(res => {
        var status = res.data.status
        if (status !== 415) {
          document.cookie = 'isLogined=1'
          local.setLocal('token', res.data.token)
        }
        this.setState({ status: status })
      })
  }
}

export default SubmitContainer
