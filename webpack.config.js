const path = require('path');
const webpack = require('webpack');

const DEV = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.'),
  },
  resolve: {
    extensions: ['.js', '.md'],
  },
  module: {
    loaders: [
      { test: /\.js?$/, loader: 'babel-loader' },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw-loader', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify-loader', exclude: /node_modules/ },
      { test: /\.md$/, loader: 'raw-loader' },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=images/[name].[ext]' },
      { test: /\.(mp3|mp4|wav)$/i, loader: 'file-loader?name=sounds/[name].[ext]' },
    ],
  },
  devtool: DEV ? 'cheap-eval-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '.'),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      }
    }),
  ],
};
