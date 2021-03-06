const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: path.join(__dirname, '/src'),
  entry: ['@babel/polyfill', path.join(__dirname, '/src/js')],
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules&localIdentName=[name]__[local]__[hash:base64:5]',
          ],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 51200,
              name: './images/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
    new webpack.DefinePlugin({
      NODE_API_URL: JSON.stringify(process.env.NODE_API_URL),
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'eval-source-map';
    config.devServer = {
      contentBase: path.join(__dirname, '/public'),
      historyApiFallback: true,
      port: 5000,
    };
  }
  return config;
};
