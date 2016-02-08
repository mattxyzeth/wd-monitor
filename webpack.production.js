const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const sassIncludePaths = [
  path.resolve(__dirname, 'app/styles'),
  path.resolve(__dirname, 'node_modules')
];

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + sassIncludePaths.join('&includePaths[]=')
];

module.exports = [
  {
    name: 'Node/Express Backend',
    entry: path.resolve(__dirname, 'server/src/index.js'),
    output: {
      path: path.join(__dirname, 'server', 'build'),
      filename: 'index.js',
      target: 'node'
  },
  {
    name: 'React Front End',
    entry: {
      app: path.resolve(__dirname, 'app/index.js'),
      vendors: [
        'babel-polyfill',
        'bootstrap',
        'c3',
        'flux',
        'jquery',
        'moment',
        'moment-duration-format',
        'react',
        'react-dom',
        'socket.io-client'
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'app.js',
      publicPath: '/'
    },
    devtool: 'source-maps',
    devServer: {
      inline: true,
      contentBase: './dist'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        },
        {
          test: /\.sass$/,
          loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('app.css'),
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    postcss: [
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ],
    resolve: {
      extensions: ['', '.js', '.sass'],
      modulesDirectories: ['app', 'node_modules']
    }
  }
];
