var webpack = require('webpack');
var path = require('path');
var utils = require('./webpack.utils')
var consts = require('./webpack.consts')
var merge = require('webpack-merge')

var CopyWebpackPlugin = require('copy-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ManifestPlugin = require('webpack-manifest-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const projectRoot = path.resolve(__dirname, './')

var isProduction = function() {
  return process.env.NODE_ENV === 'production'
}

var isDev = function() {
  return process.env.NODE_ENV === 'dev'
}

var outputPath = function() {
  return path.resolve(__dirname, '../priv/static/')
}

var plugins = [
  new webpack.DefinePlugin(consts.defines({ isProduction: isProduction() })),
  new CommonsChunkPlugin({
    name: "admin_commons",
    filename: 'js/admin_commons.js',
    chunks: ['admin'],
    minChunks: function(module, count) {
      return ((module.resource && module.resource.indexOf(path.join(__dirname,
        './node_modules')) === 0))
    }
  }),
  new CommonsChunkPlugin({
    name: "login_commons",
    filename: 'js/login_commons.js',
    chunks: ['login'],
    minChunks: function(module, count) {
      return ((module.resource && module.resource.indexOf(path.join(__dirname,
        './node_modules')) === 0))
    }
  }),
  new CommonsChunkPlugin({
    name: "app_commons",
    filename: 'js/app_commons.js',
    chunks: ['app'],
    minChunks: function(module, count) {
      return ((module.resource && module.resource.indexOf(path.join(__dirname,
        './node_modules')) === 0))
    }
  }),

  new CopyWebpackPlugin([{
    from: 'login/assets/*',
    to: 'images/'
  }, {
    from: 'admin/assets/*',
    to: 'images/',
  }, {
    from: 'app/assets/*',
    to: 'images/',
  }] ),
];

module.exports = {
  entry: {
    login: ['./login'],
    app: ['./app'],
    admin: ['./admin'],
  },

  output: {
    path: outputPath(),
    filename: 'js/[name].js',
  },

  resolve: {
    extensions: [
      '.js', '.vue', '.css', '.json',
    ],
    unsafeCache: isDev(),
    alias: {
      vue: 'vue/dist/vue.common.js',
      common: path.join(__dirname, './common'),
      login: path.join(__dirname, './login'),
      admin: path.join(__dirname, './admin'),
      app: path.join(__dirname, './app'),
    }
  },

  cache: isDev(),

  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: require('./vue-loader.conf'),
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: projectRoot,
      exclude: [new RegExp(`node_modules\\${path.sep}(?!vue-bulma-.*)`)],
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: "url-loader?limit=4096&name=/images/[name].[ext]"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=4096&minetype=application/font-woff&name=/fonts/[name].[ext]"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader?name=/fonts/[name].[ext]"
    }, ].concat(utils.styleLoaders({ sourceMap: false, extract: isProduction(), }))
  },

  plugins: plugins,

  performance: {
    hints: false
  }
};

if (isProduction()) {
  module.exports.plugins.push(
    new ExtractTextPlugin('css/[name].css'),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      'screw-ie8': true,
      sourceMap: false,
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    }), new webpack.optimize.OccurrenceOrderPlugin())
} else {
  module.exports.devtool = '#eval-source-map'
}