'use strict'

const utils = require('./webpack.utils')

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false,
    extract: process.env.env == 'production',
  }),
  postcss: [
    require('autoprefixer')({
      browsers: ['last 3 versions']
    })
  ]
}

