const path = require('path');

const pkg = require('./package');

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
  externals: [
    {
    }
  ],
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
  }
};
