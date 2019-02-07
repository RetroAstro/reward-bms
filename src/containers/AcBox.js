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
    filterBox (value) {
      var exist = this.state.acboxlist.some(box => box.acname.includes(value))
      if (exist) {
        this.setState({
          acboxlist: this.state.acboxlist.filter(box => box.acname.includes(value))
        })
      }
    }
    clearAll = async () => {
      await this.setState({
        acboxlist: []
      })
    }
}

export default AcBoxContainer
