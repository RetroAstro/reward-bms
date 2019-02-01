import fs from 'fs'
import { join } from 'path'
import Router from 'koa-router'
import { validateLogin } from '../controllers/login'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.type = 'text/html'
  ctx.body = fs.createReadStream(join(__dirname, '../../client/dist/main.html'))
})

router.get('/token', async (ctx) => {
  ctx.body = ctx.csrf
})

router.post('/login', validateLogin)

export default router
