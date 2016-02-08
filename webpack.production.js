const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const sassIncludePaths = [
  path.resolve(__dirname, 'app/styles'),
  path.resolve(__dirname, 'node_modules')
];

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + sassIncludePaths.join('&includePaths[]=')
];

const nodeModules = {};

fs.readdirSync('node_modules').filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
}).forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = [
  {
    name: 'Node/Express Backend',
    entry: path.resolve(__dirname, 'server/src/index.js'),
    target: 'node',
    output: {
      path: path.join(__dirname, 'server', 'build'),
      filename: 'index.js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loaders: ['babel-loader']
        }
      ]
    },
    node: {
      __dirname: true
    },
    externals: nodeModules
  },
  {
    name: 'React Front End',
    entry: {
      app: path.resolve(__dirname, 'app/index.js'),
      vendors: [
        'babel-polyfill',
        'jquery',
        'c3',
        'flux',
        'moment',
        'moment-duration-format',
        'react',
        'react-dom',
        'socket.io-client'
      ]
    },
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'app.js',
      publicPath: '/'
    },
    devServer: {
      inline: true,
      contentBase: './public'
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
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        'window.jQuery': "jquery" 
      })
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
