module.exports = {
	entry: './js/app',
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
			}
		]
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/dist',
		filename: 'app.js'
	}
};