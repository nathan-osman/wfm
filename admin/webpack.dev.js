const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/admin/,
          to: '/admin/index.html',
        },
      ],
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://127.0.0.1:8000',
      },
    ],
  },
})
