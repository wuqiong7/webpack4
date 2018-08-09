const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('@dtwave/oner-server/common/config')
const _ = require('lodash')
const pkg = require('./package.json')
const themeConfig = require(pkg.theme)
const theme = themeConfig()

const HOST = '0.0.0.0'
const PORT = config('client.port')
let commonPlugins = []

const clientIsDev = config('client.isDevelopment')
console.log(config('client.isDevelopment'))
console.log('PORT:', PORT)

// 环境数据
const envData = {
  __DEV__: clientIsDev,
  __PRO__: !clientIsDev,
}

module.exports = {
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    // 静态库文件存放的根目录，所以url中不需要包含`node_modules/`这一层
    // http://0.0.0.0:3000/react/dist/react.min.js
    contentBase: [path.join(__dirname, 'node_modules')],
    compress: true,
    inline: true,
    hot: true,
    port: PORT,
    host: HOST,
    // open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    noInfo: true,
  },
  entry: './src/index',
  output: {
    // path配置只在build时才有用到
    path: path.join(__dirname, 'dist'),

    filename: '[name].js',
    chunkFilename: '[name].chunk.js',

    // 决定静态资源的url前缀，注意包括chunk，所以要同时把dev和pro环境都配对
    publicPath: config('client.url.host') + config('client.url.staticPath'),
    // publicPath: 'http://0.0.0.0:3000/static/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader?cacheDirectory'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
        }),
      },
      {
        test: /\.json$/,
        use: ['json-loader'],
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'stylus-loader'],
        }),
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`,
          ],
        }),
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        exclude: [path.resolve(__dirname, './src/icon')],
        use: [{
          loader: 'url-loader',
          query: {
            name: '[name].[hash:8].[ext]',
            limit: 1024 * 10,
          },
        }],
      },
      {
        test: /\/[A-Za-z0-9-]+\.svg$/,
        include: [
          path.resolve(__dirname, './src/icon'),
        ],
        use: [
          {loader: 'svg-sprite-loader'},
          {loader: 'svgo-loader', options: {
            plugins: [
              {removeTitle: true},
              {convertColors: {shorthex: true}},
              {convertPathData: true},
              {removeComments: true},
              {removeDesc: true},
              {removeUselessDefs: true},
              {removeEmptyAttrs: true},
              {removeHiddenElems: true},
              {removeEmptyText: true},
              {removeUselessStrokeAndFill: true},
              {moveElemsAttrsToGroup: true},
              {removeStyleElement: true},
              {cleanupEnableBackground: true},
              {removeAttrs: {attrs: '(stroke|fill)'}},
            ],
          }},
        ],
      },
      {
        test: /\/[A-Za-z0-9-]+\.color\.svg$/,
        include: [
          path.resolve(__dirname, './src/icon'),
        ],
        use: [
          {loader: 'svg-sprite-loader'},
          {loader: 'svgo-loader', options: {
            plugins: [
              {removeTitle: true},
              {convertColors: {shorthex: true}},
              {convertPathData: true},
              {removeComments: true},
              {removeDesc: true},
              {removeUselessDefs: true},
              {removeEmptyAttrs: true},
              {removeHiddenElems: true},
              {removeEmptyText: true},
              {removeUselessStrokeAndFill: true},
              {moveElemsAttrsToGroup: true},
              {removeStyleElement: true},
              {cleanupEnableBackground: true},
            ],
          }},
        ],
      },
    ],
  },
  plugins: [
    // 从多个模块中提取共用的模块到common.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'common.js',
    }),
    new webpack.DefinePlugin(envData),
    new ExtractTextPlugin('[name].css'),
  ],
  externals: {
    react: 'var React',
    'react-dom': 'var ReactDOM',
    mobx: 'var mobx',
    'mobx-react': 'var mobxReact',
    _: 'var _',
    antd: 'var antd',
  },
}

if (!clientIsDev) {
  commonPlugins = [
    // 是否压缩JS 如果不压缩 需要全部注释掉
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      output: false,
      compress: {
        unused: true,
        dead_code: true,
        pure_getters: true,
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        comparisons: true,
        sequences: true,
        evaluate: true,
        join_vars: true,
        if_return: true,
      },
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      quiet: true,
    }),
  ]
} else {
  commonPlugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ]
  module.exports.devtool = 'source-map'
}

module.exports.plugins = module.exports.plugins.concat(commonPlugins)
