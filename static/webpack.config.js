var webpack = require('webpack');
var path = require('path');
var utils = require('./webpack.utils')
var consts = require('./webpack.consts')
var merge = require('webpack-merge')

const autoprefixer = require('autoprefixer');

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ManifestPlugin = require('webpack-manifest-plugin');
var CompressionPlugin = require("compression-webpack-plugin");

var isProduction = function() {
  return process.env.NODE_ENV === 'production'
};

var outputPath = function() {
  return path.resolve(__dirname, '../priv/static/')
}

var plugins = [

  new webpack.DefinePlugin(consts.defines({
    isProduction: isProduction()
  })),

  new CommonsChunkPlugin({
    name: "admin_commons",
    filename: isProduction() ? 'js/admin_commons-[hash].js' : 'js/admin_commons.js',
    chunks: ['admin'],
    minChunks: function(module, count) {
      return (
        (module.resource &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0)
      )
    }
  }, Infinity),

  new CommonsChunkPlugin({
    name: "login_commons",
    filename: isProduction() ? 'js/login_commons-[hash].js' : 'js/login_commons.js',
    chunks: ['login'],
    minChunks: function(module, count) {
      return (
        (module.resource &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0)
      )
    }
  }, Infinity),

  new CommonsChunkPlugin({
    name: "payment_commons",
    filename: isProduction() ? 'js/payment_commons-[hash].js' : 'js/payment_commons.js',
    chunks: ['payment'],
    minChunks: function(module, count) {
      return (
        (module.resource &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0)
      )
    }
  }, Infinity),

  new CommonsChunkPlugin({
    name: "forum_commons",
    filename: isProduction() ? 'js/forum_commons-[hash].js' : 'js/forum_commons.js',
    chunks: ['forum'],
    minChunks: function(module, count) {
      return (
        (module.resource &&
          module.resource.indexOf(path.join(__dirname, './node_modules')) === 0)
      )
    }
  }, Infinity),

  new ExtractTextPlugin(isProduction() ? 'css/[name]-[hash].css' : 'css/[name].css'),
]

module.exports = {
  entry: {
    login: ['./login'],
    forum: ['./forum'],
    admin: ['./admin'],
    payment: ['./payment'],
  },

  output: {
    path: outputPath(),
    filename: isProduction() ? 'js/[name]-[hash].js' : 'js/[name].js',
    hash: isProduction()
  },

  resolve: {
    extensions: ['', '.js', '.vue', '.css', '.json'],
    moduleDirectories: ['node_modules'],
    fallback: [path.join(__dirname, './node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  },

  cache: !isProduction(),

  resolveLoader: {
    fallback: [path.join(__dirname, './node_modules')],
  },

  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.js$/,
      // exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-2'],
        compact: false
      },
      exclude: [new RegExp(`node_modules\\${path.sep}(?!vue-bulma-.*)`)]
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: "url-loader?limit=16384&name=/images/[name].[hash:7].[ext]"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=16384&minetype=application/font-woff&name=/fonts/[name].[hash:7].[ext]"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader?name=/fonts/[name].[hash:7].[ext]"
    }].concat(utils.styleLoaders({}))
  },

  plugins: plugins,

  vue: {
    loaders: utils.cssLoaders({
      extract: true
    })
  },

  babel: {
    presets: ['es2015', 'stage-2']
  },

  postcss: [autoprefixer]
};

if (isProduction()) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new WebpackMd5Hash(),
    new ManifestPlugin({
      fileName: './build-manifest.json'
    })
  )
} else {
  module.exports.devtool = '#inline-source-map'
}