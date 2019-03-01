import { Container } from 'unstated'
import { requestLogin } from '../api'
import local from '@utils/local'

class SubmitContainer extends Container {
  state = {
    status: ''
  }
  reset = async () => {
    await this.setState({ status: '' })
  }
  async login (data) {
    var res = await requestLogin(data)
    var status = res.data.status
    if (status === 0) {
      document.cookie = 'isLogined=1'
      local.setLocal('token', res.data.token)
    }
    await this.setState({ status })
  }
}

export default SubmitContainer
