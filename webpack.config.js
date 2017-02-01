import path from 'path';
import webpack from 'webpack';
import envHelper from './utils/envHelper';
const isProduction = process.argv.indexOf('-p') !== -1;
const parsedEnvs = envHelper('./.env');


module.exports = {
  context: path.resolve(__dirname, './client'),
  
  devtool: (isProduction) ? '' : 'source-map',
  entry: {
    app: './app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist/assets'),
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
          options: { presets: ['react', 'es2015', 'babel-preset-stage-0'] }
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
        'NODE_ENV': (isProduction) ? '"production"' : '""',
        ...parsedEnvs
      }
    })
  ]

};