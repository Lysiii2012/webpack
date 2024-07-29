const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/script.js', // Основной JS файл
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset',
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: false,
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        '...',
        new CssMinimizerPlugin(),
      ],
    },
    devServer: {
      static: './dist',
      hot: true,
      open: true,
    },
    watch: !isProduction,
  };
};
