import bcrypt from 'bcryptjs'
import UserModel from '../models/user'
import encryptSignature from '../helpers/encrypt'

const checkUser = async ({ orz_name, password }) => {
  const user_info = await UserModel.findOne({ orz_name })
  return !!(user_info && await bcrypt.compare(password, user_info.password))
}

export const validateLogin = async (ctx) => {
  var data = ctx.request.body
  if (await checkUser(data)) {
    ctx.cookies.set(
      'isLogined',
      encryptSignature(data.orz_name),
      { httpOnly: false }
    )
    ctx.body = JSON.stringify({
      msg: 'login success',
      loginCode: 1
    })
  } else {
    ctx.body = JSON.stringify({
      msg: 'login failed',
      loginCode: 0
    })
  }
}
