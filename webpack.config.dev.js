const path = require('path');
const webpack = require('webpack');
const WebpackBrowserPlugin = require('webpack-browser-plugin');

const excludeDir = path.resolve(__dirname, 'node_modules');
//"start": "cross-env NODE_ENV=development webpack-dev-server --inline --progress --config webpack.config.dev",
module.exports = {
	devtool: 'eval-source-map',
	setIpAndPort(localIp, port) {
		this.entry.unshift(`webpack-dev-server/client?http://0.0.0.0:${port}`);   
		this.output.publicPath = `/static/`; 
		this.plugins.push(new WebpackBrowserPlugin({
		  port,
		  url: `http://${localIp}`
		}));
	},
	entry: [
	  'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
		'./js/index'
	],
	output: {
		path: path.join(__dirname, 'static'),
		filename: 'main.js',
		// publicPath: `http://${localIp}:${port}/static/`
	},
	module: {
		loaders:[{
			test: /\.jsx?$/,
			exclude: excludeDir,
			loader: 'babel?cacheDirectory'
		}, {
			test: /\.css$/,
			exclude: excludeDir,
			loader: 'style!css?module&localIdentName=[local]_[name]-[hash:base64:5]'
		}]
	},
	cache: true,
	resolve: {
		extensions: ["", ".js", ".json", ".jsx"]
	},
	plugins: [
		new webpack.DefinePlugin({
		   'process.env.NODE_ENV': '"development"'
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	postcss: [
		require('autoprefixer')//调用autoprefixer插件
	]
}