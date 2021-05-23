const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const IS_DEV = (process.env.NODE_ENV === 'dev');

module.exports = {
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },
  entry: {
    common: './src/js/common.js',
    index: './src/js/index.js'
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: './src/img/',
      to: 'assets/img/'
    }]),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/style.css',
      chunkFilename: 'assets/css/[id].css',
    }),
    new HtmlWebpackPlugin({
      scriptLoading: 'defer',
      template: 'src/index.html'
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'static',
    //   generateStatsFile: false
    // })
  ],
  output: {
    filename: 'assets/js/[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          // chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: IS_DEV,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                AutoPrefixer({
                  overrideBrowserslist: ['last 4 versions'],
                  grid: 'autoplace'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/img/',
          esModule: false
        }
      }
    ]
  }
};