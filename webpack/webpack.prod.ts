import { Configuration } from "webpack";
import path from 'path';
import commonWebpackConfig from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';

const config: Configuration = merge(commonWebpackConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname,'../target'),
        filename: '[name].bundle.js'
    }
},
{
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
})

export default config;