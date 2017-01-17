const path = require('path');
const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');
const port = 3000;
const excludeDir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: './js/index',
  devtool: 'cheap-module-source-map',
  output: {
    path: path.join(__dirname, 'assets/js'),
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: excludeDir,
      loader: 'babel?cacheDirectory'
    }, {
      test: /\.css$/,
      exclude: excludeDir,
      loader: 'style!css?module&localIdentName=[local]_[name]-[hash:base64:5]'
    }]
  },
  cache: true,
  resolve: {
  	// noParse: [path.join(excludeDir, 'react')],
    extensions: ["", ".js", ".json", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ],
  postcss: [
    require('autoprefixer') //调用autoprefixer插件
  ]
}
