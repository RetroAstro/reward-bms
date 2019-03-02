import Storage from './storage'

const local = new Storage()

local.setLocal('failMsg', [])

local.setLocal('dataList', [])

local.setLocal('qrcodeList', [])

local.setLocal('historyList', [])

export default local
