class Storage {
  constructor () {
    this.ls = window.localStorage
  }
  setLocal (key, value) {
    this.ls.setItem(key, JSON.stringify(value))
  }
  getLocal (key) {
    return JSON.parse(this.ls.getItem(key))
  }
  removeLocal (key) {
    this.ls.removeItem(key)
  }
  clearLocal () {
    this.ls.clear()
  }
}

export default Storage
