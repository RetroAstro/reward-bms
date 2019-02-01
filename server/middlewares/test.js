import bcrypt from 'bcryptjs'
import UserModel from '../models/user'

const ORZ = 'Redrock'
const PSW = 'Redrock.team.web'

export const initialDB = async () => {
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(PSW, salt)
  UserModel.create({
    orz_name: ORZ,
    password: password
  })
}
