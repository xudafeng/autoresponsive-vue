'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const pkg = require('./package');

const isProduction = process.env.NODE_ENV === 'production';

class WebpackAfterAllPlugin {
  apply (compiler) {
    compiler.plugin('done', (compilation) => {
      setTimeout(() => {
        fs.writeFileSync(path.join(__dirname, '.ready'), '')
      }, 1000)
    })
  }
}

module.exports = {
  entry: {
    [pkg.name]: path.join(__dirname, 'src'),
    homepage: path.join(__dirname, 'homepage'),
    examples: path.join(__dirname, 'examples')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: '[name].js',
    library:'[name]',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2']
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: isProduction ? {} : {
          postLoaders: {
            js: 'istanbul-instrumenter-loader?esModules=true&coverageVariable=__macaca_coverage__',
          },
        },
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new WebpackAfterAllPlugin()
  ]
};
