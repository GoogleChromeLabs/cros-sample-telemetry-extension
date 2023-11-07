/* eslint-disable */


const CopyWebpackPlugin = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');
const {NormalModuleReplacementPlugin} = require('webpack');
const path = require('path');

const common = require('./webpack.common.js');
const config = require('./webpack_config.js');

module.exports = merge(common, {
  mode : 'development',
  devtool : 'inline-source-map',
  plugins :
          [
            new NormalModuleReplacementPlugin(
                /src\/environments\/environment\.ts/, './environment.dev.ts'),
            new CopyWebpackPlugin({
              patterns :
              [
                {
                  from : 'public/manifest.dev.json',
                  to : path.resolve(
                      __dirname, config.outputDir, 'manifest.json')
                },
              ]
            })
          ],
});
