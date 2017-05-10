module.exports = {
  parser: false,
  plugins: {
    // TODO: add postcss-import options
    // 'postcss-import': {},
    'cssnext': {},
    'autoprefixer': {
      browsers: ['last 3 version', 'iOS >= 8', 'Safari >= 8', 'Android >= 4.4']
    },
    'cssnano': {}
  }
}