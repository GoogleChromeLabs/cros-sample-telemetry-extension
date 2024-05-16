/**
 * Copyright 2024 Google LLC
 *
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file or at
 * https://developers.google.com/open-source/licenses/bsd
 */

/* eslint-disable */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');
const path = require('path');

const common = require('./webpack.common.cjs');
const config = require('./webpack_config.cjs');

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
