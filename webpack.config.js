const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { DefinePlugin } = require('webpack')

module.exports = {
  entry: './src/webpack.js',
  mode: 'development',
  // devtool: 'source-map',
  // resolve: {
  //   extensions: ['.js', '.json'],
  //   alias: [
  //     {
  //       '@': path.resolve(__dirname, 'src')
  //     }
  //   ]
  // },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
    publicPath: ''
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
                  importLoaders: 1,
                  esModule: false
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
        type: 'asset',
        generator: {
          filename: "img/[name].[hash:6][ext]"
        },
        parser: {
          dataUrlCondition: {
            maxSize: 45 * 1024
          }
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      } 
    ]
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: '爸爸的地盘',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    })
  ],
  devServer: {
      port: 8083,
      contentBase: path.resolve(__dirname, 'public'),
      // watchContentBase: true,
      publicPath: '',
      // 不压缩
      compress: false
  }
};