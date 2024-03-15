import { Configuration } from "webpack";
import path from 'path';
import commonWebpackConfig from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'

import merge from 'webpack-merge';

const config: Configuration = merge(commonWebpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname,'../target'),
        filename: '[name].bundle.js',
    }
},
{
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {from : path.resolve(__dirname,'../public/404.html'), to: path.resolve(__dirname,'../target/404.html')}
            ]
        })
    ]
})

export default config;