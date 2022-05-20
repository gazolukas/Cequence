const merge = require('webpack-merge');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./webpack.config.js');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = (relativePath) => path.resolve(appDirectory, relativePath);

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: resolveAppPath('public'),
    compress: true,
    port: 3000,
    hot: true,
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index-dev.html',
    }),
    new webpack.DefinePlugin(envKeys),
  ],
});
