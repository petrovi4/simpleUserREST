const path = require('path');

const merge = require('webpack-merge');
const common = require('./common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const paths = {
	dist: path.resolve(__dirname, '..', 'dist'),
};

let webPackConfig = merge(common, {
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		host: '0.0.0.0',
		port: process.env.PORT,
		contentBase: paths.dist,
		writeToDisk: false,
		historyApiFallback: true,
		proxy: { '/api': 'http://localhost:8080' },
	},
});

if (webPackConfig.devServer.writeToDisk) webPackConfig.plugins.unshift(new CleanWebpackPlugin());

module.exports = webPackConfig;
