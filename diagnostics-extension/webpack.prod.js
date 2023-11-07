/* eslint-disable */

const path = require('path');

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
    path : path.resolve(__dirname, 'build'),
  },
  resolve : {
    extensions : ['.ts'],
    alias : {
      [path.resolve(__dirname, 'src/environments/environment.ts')] : path.resolve(
          __dirname, 'src/environments/environment.prod.ts'),
      [path.resolve(__dirname, 'public/manifest.json')] : path.resolve(
          __dirname, 'public/manifest.prod.json'),
    }
  },
};
