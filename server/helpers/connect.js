import mongoose from 'mongoose'

const connect = DB => mongoose.connect(DB, { keepAlive: true })

export default connect
