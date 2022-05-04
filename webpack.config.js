const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/[hash][ext]',
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html',
          inject: 'head',
          favicon: './assets/keyboard.ico',
        }),

        new MiniCssExtractPlugin({ 
            filename: '[name].[contenthash].css',
          }),
        new CleanWebpackPlugin(),
        new ESLintPlugin({ extensions: ['js']}),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: 'asset/inline',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
              },
              {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
              },
        ],
    }
}