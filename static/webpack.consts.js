exports.defines = function(options) {
  options = options || {isProduction: false}
  return {
    __PRODUCTION__: options.isProduction,
  }
}