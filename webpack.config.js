import path from 'path';
import webpack from 'webpack';
import envHelper from './utils/envHelper';
const isProduction = process.argv.indexOf('-p') !== -1;
const parsedEnvs = envHelper('./.env');


module.exports = {
  context: path.resolve(__dirname, 'client'),
  
  devtool: (isProduction) ? '' : 'source-map',
  entry: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    './index.js',
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/assets'),
    publicPath: '/assets',
  },

  resolve: {
    alias: {
      node_modules: path.resolve(__dirname, 'node_modules'),
      Utils: path.resolve(__dirname, 'client/utils/'),
      Styles: path.resolve(__dirname, 'client/styles/')
    }
  },
  
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/assets',
    hot: true,
    historyApiFallback: true
  },
  performance: {
    hints: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': (isProduction) ? '"production"' : '""',
        ...parsedEnvs
      }
    }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],

};