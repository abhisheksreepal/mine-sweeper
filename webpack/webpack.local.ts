import type { Configuration } from "webpack";
import path from 'path';
import devConfig from './webpack.dev';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin'
import merge from 'webpack-merge';
import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'

const config: Configuration = merge(devConfig, {
    output: {
        path: path.resolve(__dirname,'../target'),
        filename: '[name].bundle.js',
        publicPath: 'http://localhost:9000/mine-sweeper/'
    },
    devServer: {
        port: 9000,
        historyApiFallback: {
            index: 'http://localhost:9000/mine-sweeper/'
        },
        
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
        }),
        new CopyPlugin({
            patterns: [
                {from : path.resolve(__dirname,'../public/404.html'), to: path.resolve(__dirname,'../target/404.html')}
            ]
        })
       
    ]
})

export default config;