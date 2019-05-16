const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseWebpackConfig = require('./webpack.config.base')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3000,
    host: 'localhost',
    hot: true,
    compress: true,
    open: true,
    quiet: true,
    disableHostCheck: true,
    // historyApiFallback: true,
    proxy: {
      '/234/prizetool': {
        target: 'https://wx.idsbllp.cn',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html'),
      favicon: path.join(__dirname, '../public/favicon.ico'),
      inject: true
    })
  ]
})

module.exports = devWebpackConfig
