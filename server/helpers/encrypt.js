import crypto from 'crypto'
import { secret } from '../config'

const encryptSignature = (orz_name) => {
  var hmac = crypto.createHmac('sha256', secret)
  hmac.update(orz_name)
  return hmac.digest('hex') + '.' + orz_name
}

export default encryptSignature
