import type { Configuration } from "webpack";
import path from 'path';
import commonWebpackConfig from './webpack.common';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import merge from 'webpack-merge';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'

const config: Configuration = merge(commonWebpackConfig, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    output: {
        path: path.resolve(__dirname,'../target'),
        filename: '[name].bundle.js',
    },
    devServer: {
        port: 9000,
        historyApiFallback: true,
      
        static: {
            directory: path.resolve(__dirname,'../target')
        },
        compress: true,
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