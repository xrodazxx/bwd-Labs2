const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: true,
            filename: 'index.html',
        }), new HtmlWebpackPlugin({
            template: './src/about.html',
            inject: true,
            filename: 'about.html',
        }),new HtmlWebpackPlugin({
            template: './src/taskList.html',
            inject: true,
            filename: 'taskList.html',
        }), new HtmlWebpackPlugin({
            template: './src/404.html',
            inject: true,
            filename: '404.html',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        open: true,
    },
    mode: 'development',
};
