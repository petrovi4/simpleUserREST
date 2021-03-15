const path = require('path');

const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


let paths = { root: path.resolve(__dirname, '..') };
paths.entry = path.resolve(paths.root, 'src', 'index.js');
paths.dist = path.resolve(paths.root, 'dist');
paths.public = path.resolve(paths.root, 'public');
paths.index = path.resolve(paths.public, 'index.html');
paths.favicon = path.resolve(paths.public, 'assets', 'img', 'logo.png');


// Loading the application config
let appConfig = process.env.APP_CONFIG;
if (!appConfig) throw new Error('APP_CONFIG must be defined in environment variables');
appConfig = require(`./${appConfig}`);
appConfig = Object.entries(appConfig).reduce((res, [key, value]) => {
	res[key] = JSON.stringify(value);
	return res;
}, {});



let webPackConfig = {
	entry: {
		app: paths.entry,
	},
	output: {
		publicPath: '/',
		path: paths.dist,
		filename: '[name].[contenthash].bundle.js',
	},
	optimization: {
		splitChunks: {
			chunks: 'initial',
			cacheGroups: {
				default: false,
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: paths.index,
		}),

		new CopyWebpackPlugin([
			{
				from: paths.public,
				ignore: ['index.html'],
				flatten: false,
			},
		]),

		new DefinePlugin(appConfig),
	],
};


module.exports = webPackConfig;
