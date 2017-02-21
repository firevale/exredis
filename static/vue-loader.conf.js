'use strict'

const utils = require('./webpack.utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: process.env.NODE_ENV !== 'production',
    extract: true
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}

