const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js'
  },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty',
    tls: 'empty'
  },
  mode: 'development',
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      { 
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
       test: /\.(png|svg|jpg|gif)$/,
       use: ['file-loader']
      }
    ]
  }
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: path.resolve('.', 'src', 'html', 'index.html'),
  //     filename: path.join('.', 'index.html'),  // ATTENTION
  //     excludeChunks: [ 'server' ]
  //   }),
  //   new webpack.NoEmitOnErrorsPlugin()
  // ]
}