/** created by panchong on 2018/2/11* */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true, // css压缩
                        },
                    }],
                }),
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            minimize: true, // css压缩
                        },
                    }, 'less-loader'],
                }),
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
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                    },
                }],
            },
            {
                loader: 'image-webpack-loader', // 压缩图片文件
                options: {
                    bypassOnDebug: true,
                },
            },
            {
                test: /\.(woff|woff2|svg|eot|ttf|otf)$/,
                loader: 'file-loader',
                options: {
                    minimize: true,
                    outputPath: 'font/',
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            DEV_STATE: JSON.stringify(JSON.parse(process.env.DEV || 'false')),
            "process.env": {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new ExtractTextPlugin('css/[id].[hash].css'),
        new HtmlWebpackPlugin({
            // 压缩配置
            minify: {
                removeAttributeQuotes: true, // 去掉标签上属性的引号
            },
            hash: true,
            template: path.join(__dirname, '/index-tmpl.html'),
            excludeChunks: ['front'],
        }),
        new CleanWebpackPlugin(
            ['dist'], // 匹配删除的文件
            {
                root: __dirname,
                verbose: true,
                dry: false,
            },
        ),
        new CopyWebpackPlugin([{
            from: 'questionHtml/**/*', to: './',
        }]),
    ],
};
