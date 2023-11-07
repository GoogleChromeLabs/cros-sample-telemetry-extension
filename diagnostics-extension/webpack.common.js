/* eslint-disable */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const config = require('./webpack_config.js');

module.exports = {
  mode : 'production',
  entry : './src/sw.ts',
  module : {
    rules :
          [
            {
              test : /\.ts$/,
              use : 'ts-loader',
              include : [path.resolve(__dirname, 'src')],
            },
          ],
  },
  output : {
    filename : 'sw.js',
    path : path.resolve(__dirname, config.outputDir),
  },
  resolve : {
    extensions : ['.ts'],
  },
  plugins : [new CopyWebpackPlugin({
    patterns :
    [
      {
        from : 'public/images',
        to : path.resolve(__dirname, config.outputDir, 'images')
      },
    ]
  })]
};
