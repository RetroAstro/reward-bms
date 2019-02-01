import Event from './event'

const bus = new Event()

bus.init = function () {
  this.data = {
    acname: '',
    status: '',
    typelist: [],
    untypelist: []
  }
}

bus.init()

export default bus
