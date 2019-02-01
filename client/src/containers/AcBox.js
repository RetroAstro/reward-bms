import { Container } from 'unstated'

class AcBoxContainer extends Container {
    state = {
      acboxlist: []
    }
    addBox (data) {
      this.setState({
        acboxlist: [...this.state.acboxlist].concat(data)
      })
    }
    deleteBox (acname) {
      this.setState({
        acboxlist: this.state.acboxlist.filter(box => box.acname !== acname)
      })
    }
    clearAll = async () => {
      await this.setState({
        acboxlist: []
      })
    }
}

export default AcBoxContainer
