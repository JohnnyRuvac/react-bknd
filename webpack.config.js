import path from 'path';
import webpack from 'webpack';
import envHelper from './utils/envHelper';
const isProduction = process.argv.indexOf('-p') !== -1;
const parsedEnvs = envHelper('./.env');


const getEntries = () => {
  if (!isProduction) {
    return [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates
      './index.js',
    ];
  } else {
    return ['./index.js'];
  }
};

let plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': (isProduction) ? '"production"' : '""',
      ...parsedEnvs
    }
  })
];

if (!isProduction) {
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    ...plugins,
  ];
}


module.exports = {
  context: path.resolve(__dirname, 'client'),
  
  devtool: (isProduction) ? false : 'source-map',
  entry: getEntries(),
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
        use: [
          'style-loader',
          'css-loader?importLoaders=1',
          'postcss-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /\.(svg)$/,
        use: ['svg-url-loader'],
      }
    ],
  },

  plugins: plugins,

};