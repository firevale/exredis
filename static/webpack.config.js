var webpack = require('webpack');
var path = require('path');
var utils = require('./webpack.utils')
var consts = require('./webpack.consts')
var merge = require('webpack-merge')

var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
  new webpack.DefinePlugin(consts.defines({
    isProduction: isProduction(),
  })),

  new webpack.optimize.CommonsChunkPlugin({
    name: "admin_commons",
    filename: 'js/admin_commons.js',
    chunks: ['admin'],
    minChunks: function(module, count) {
      return ((module.resource && module.resource.indexOf(path.join(__dirname,
        './node_modules')) === 0))
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "login_commons",
    filename: 'js/login_commons.js',
    chunks: ['login'],
    minChunks: function(module, count) {
      return ((module.resource && module.resource.indexOf(path.join(__dirname,
        './node_modules')) === 0))
    }
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "app_commons",
    filename: 'js/app_commons.js',
    chunks: ['app'],
    minChunks: function(module, count) {
      return ((module.resource && module.resource.indexOf(path.join(__dirname,
        './node_modules')) === 0))
    }
  }),

  new ExtractTextPlugin('css/[name].css'),

  new CopyWebpackPlugin([{
    from: 'assets',
    to: 'images',
    toType: 'dir',
  }]),
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
      assets: path.join(__dirname, './assets'),
      login: path.join(__dirname, './login'),
      admin: path.join(__dirname, './admin'),
      app: path.join(__dirname, './app'),
    }
  },

  cache: isDev(),

  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: require('./vue-loader.conf'),
    }, {
      test: /vue-preview.src.*?js$/,
      loader: 'babel-loader'
    }, {
      test: /\.js$/,
      use: 'babel-loader',
      include: projectRoot,
      exclude: [new RegExp(`node_modules\\${path.sep}(?!vue-bulma-.*)`)],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader']
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      })
    }, {
      test: /\.sass$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!sass-loader?indentedSyntax'
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!less-loader'
      })
    }, {
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!stylus-loader'
      })
    }, {
      test: /\.stylus$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!postcss-loader!stylus-loader'
      })
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,
      use: "url-loader?limit=4096&name=/images/[name].[ext]"
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: "url-loader?limit=4096&minetype=application/font-woff&name=/fonts/[name].[ext]"
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      use: "file-loader?name=/fonts/[name].[ext]"
    }, ]
  },

  plugins: plugins,

  performance: {
    hints: false
  }
};

if (isProduction()) {
  module.exports.plugins.push(
    new UglifyJSPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      },
      comments: false,
      beautify: true
    })
  )
} else {
  module.exports.devtool = '#cheap-source-map'
}