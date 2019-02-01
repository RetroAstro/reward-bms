export const PORT = 8080

export const appKey = 'RetroAstro'

export const DB = 'mongodb://localhost:27017/table'

export const secret = 'boom'

export const CONFIG = {
  key: 'Award_BMS:session',
  maxAge: 24 * 60 * 60 * 1000 * 7,
  overwrite: true,
  httpOnly: true,
  signed: true,
  renew: true
}
