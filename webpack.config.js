const path = require('path');

module.exports = {
    mode: 'development',
    entry: './client/index.ts', // Update with your client-side entry file path
    output: {
        path: path.resolve(__dirname, 'public'), // Update with your desired output directory
        filename: 'bundle.js',
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
        ],
    },
};
