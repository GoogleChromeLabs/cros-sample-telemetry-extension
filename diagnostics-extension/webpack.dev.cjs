/* eslint-disable */


const CopyWebpackPlugin = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');
const {NormalModuleReplacementPlugin} = require('webpack');
const path = require('path');

const common = require('./webpack.common.cjs');
const config = require('./webpack_config.cjs');

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
