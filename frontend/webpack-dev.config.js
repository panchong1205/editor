/** created by panchong on 2018/2/11* */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react', 'stage-0'],
                        plugins: [
                            'transform-runtime',
                            ['import', {libraryName: 'antd', style: 'css'}],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']}),
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader']}),
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'file-loader',
                options: {
                    limit: 8192,
                    name: '[name].[hash].[ext]',
                    outputPath: 'images/',
                },
            },
            // {
            //     test: /\.html$/,
            //     use: [{
            //         loader: 'html-loader',
            //         options: {
            //             minimize: false, // 不需要
            //         },
            //     }],
            // },
            {
                test: /\.(woff|woff2|svg|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    minimize: false, // 不需要
                    outputPath: 'font/',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV_STATE: JSON.stringify(JSON.parse(process.env.DEV || 'false')),
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
        new ExtractTextPlugin('css/[id].[hash].css'),
        new HtmlWebpackPlugin({
            hash: true,
            template: path.join(__dirname, '/index-tmpl.html'),
            excludeChunks: ['front'],
        }),
        new CopyWebpackPlugin([{
            from: 'questionHtml/**/*', to: './',
        }]),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 基本目录结构（服务器根目录）
        host: 'localhost', // 服务器地址（可以使用IP也可以使用localhost，用ipconfig命令查看自己的IP）
        port: 8000, // 端口
        // compress: true, // 是否启用服务器压缩
    },
};
