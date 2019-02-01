const error = (app) => {
  app.on('error', err => console.log(err))

  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.status = err.status || 500
      ctx.type = 'text/html'
      ctx.body = '<p>Whoops, something was wrong on the server side !</p>'
      app.emit('error', err)
    }
  }
}

export default error
