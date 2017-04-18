'use strict'

const utils = require('./webpack.utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: true,
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 5 versions']
    })
  ]
}

