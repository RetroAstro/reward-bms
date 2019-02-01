import Storage from './storage'

const local = new Storage()

local.setLocal('dataList', [])

local.setLocal('qrcodeList', [])

export default local
