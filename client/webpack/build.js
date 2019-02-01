const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.prod')

const spinner = ora('Building for production...🚀  🚀  🚀')

spinner.start()

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n'
  )
  console.log(chalk.yellowBright('Building is finished ! 😍  🎉  😆'))
})
