const path = require('path')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const config = require('./webpack.config')

module.exports = merge(config, {
	mode: 'production',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[contenthash].bundle.js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html'
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.m?js|jsx$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				}
			},
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
	optimization: {
		minimizer: [
			`...`,
			new CssMinimizerPlugin(),
		],
	},
})