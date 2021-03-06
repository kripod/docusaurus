/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import {LoadContext} from '@docusaurus/types';
import {PluginOptions} from './types';
import {Configuration} from 'webpack';

import path from 'path';

export default function (_context: LoadContext, options: PluginOptions) {
  const isProd = process.env.NODE_ENV === 'production';

  return {
    name: 'docusaurus-plugin-ideal-image',

    getThemePath() {
      return path.resolve(__dirname, './theme');
    },

    configureWebpack(_config: Configuration, isServer: boolean) {
      return {
        module: {
          rules: [
            {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                '@docusaurus/lqip-loader',
                {
                  loader: '@endiliey/responsive-loader',
                  options: {
                    emitFile: !isServer, // don't emit for server-side rendering
                    disable: !isProd,
                    // eslint-disable-next-line
                    adapter: require('@endiliey/responsive-loader/sharp'),
                    name: isProd
                      ? 'ideal-img/[name].[hash:hex:7].[width].[ext]'
                      : 'ideal-img/[name].[width].[ext]',
                    ...options,
                  },
                },
              ],
            },
          ],
        },
      };
    },
  };
}
