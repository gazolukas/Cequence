const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: resolveAppPath('src/client'),
  output: {
    filename: 'bundle.js',
    path: resolveAppPath('public'),
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
