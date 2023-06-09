const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['./client/ts/index.ts', './client/scss/style.scss'], // Update with your client-side entry file path
    output: {
        path: path.resolve(__dirname, 'public'), // Update with your desired output directory
        filename: 'bundle.js',
        publicPath: 'public/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'client/index.html', to: 'index.html' },
            ],
        }),
    ],
};
