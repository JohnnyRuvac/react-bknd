const path = require('path');
const webpack = require('webpack');
const isProduction = process.argv.indexOf('-p') !== -1;

module.exports = {
  context: path.resolve(__dirname, './src'),
  
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets',
  },
  
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
  performance: {
    hints: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['react', 'es2015'] }
        }],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': (isProduction) ? '"production"' : '""'
      }
    })
  ]

};