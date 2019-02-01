import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  orz_name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    }
  }
})

export default mongoose.model('User', UserSchema)
