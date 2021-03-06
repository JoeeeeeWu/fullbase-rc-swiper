const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.base.config');

// const theme = require('../theme');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.module\.(less|css)$/,
        exclude: path.resolve(__dirname, '../node_modules'),
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /(?<!\.module)\.(less|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                // modifyVars: theme,
              },
            },
          },
        ],
      },
    ],
  },
  devServer: {
    host: '127.0.0.1', // 我们可以允许我们用任意方式进行访问（127.0.0.1，localhost, 本机ip）
    port: '7201', // 设置端口
    // contentBase: path.join(__dirname, '../dist'),
    open: true, // 设置自动拉起浏览器
    hot: true, // 启动热加载
    // overlay: { // 错误提醒弹窗小遮层
    //   errors: true, // 只显示error
    // },
    // publicPath: '/', // 访问所有静态路径都要前面加/才能访问生成的静态文件
    historyApiFallback: {
      index: '/index.html', // 所有404的请求全部访问该配置下的url
    },
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    // disableHostCheck: true,
    // proxy: {
    //   '/admin': {
    //     target: 'http://127.0.0.1:4400',
    //   },
    // },
  },
});
