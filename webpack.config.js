const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    experiments: {
        topLevelAwait: true
    },
    entry: {
        mainPage: path.resolve(__dirname, 'frontend/index.js'),
        resultsPage: path.resolve(__dirname, 'frontend/results.js')

    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'frontend/webpacked'),
    },
    resolve: {
        extensions: ['.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "frontend/index.html"),
            inject: "body",
            filename: 'index.html',
            chunks: ['mainPage']
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "frontend/results.html"),
            inject: "body",
            filename: 'results.html',
            chunks: ['resultsPage']
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};