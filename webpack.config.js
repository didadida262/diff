const path = require('path');

module.exports = {
  entry: './src/webpack.js',
  // mode: 'development',
  output: {
    //   打包生城虚拟文件，没有物理生城
    publicPath: 'xuni',
    // path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  // 设置各种loader
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1
                }
              }, 
              'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(gif|png|svg|jp?g)$/,
        use: ['file-loader']
      }   
    ]
  },
  devServer: {
      port: 8080,
      contentBase: 'www',
      // 不压缩
      compress: false
  }
};