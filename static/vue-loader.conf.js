'use strict'

const utils = require('./webpack.utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: true,
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions', 'iOS >= 8', 'Safari >= 8']
    })
  ]
}

