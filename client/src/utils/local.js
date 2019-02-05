import Storage from './storage'

const local = new Storage()

local.setLocal('failMsg', [])

local.setLocal('dataList', [])

local.setLocal('qrcodeList', [])

export default local
