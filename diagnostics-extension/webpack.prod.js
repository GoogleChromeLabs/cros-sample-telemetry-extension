/* eslint-disable */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.js');
const config = require('./webpack_config.js');

module.exports = merge(common, {
  mode : 'production',
  plugins : [new CopyWebpackPlugin({
            patterns :
            [
              {
                from : 'public/manifest.json',
                to : path.resolve(__dirname, config.outputDir, 'manifest.json')
              },
            ]
          })],
});
