const path = require('path')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const config = require('./webpack.config')

module.exports = merge(config, {
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		contentBase: path.resolve(__dirname, './dist'),
		open: true,
		compress: false,
		port: 8080,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './src/index.html'),
			filename: 'index.html'
		}),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.m?js|jsx$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader"
				}
			},
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx'],
	},
})