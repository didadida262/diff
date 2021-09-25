const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    //   打包生城虚拟文件，没有物理生城
    publicPath: 'xuni',
    filename: 'bundle.js',
  },
  devServer: {
      port: 8080,
      contentBase: 'www'
  }
};