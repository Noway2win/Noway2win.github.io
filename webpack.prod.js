const path = require('path')
const { merge } = require('webpack-merge')
const config = require('./webpack.config.js')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

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
			}
		]
	},
	optimization: {
		minimizer: [
			`...`,
			new CssMinimizerPlugin(),
		],
	},
})