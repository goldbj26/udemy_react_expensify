const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {

	const isProduction = (env === 'production'); // set in package.json scripts
	const CSSExtract = new ExtractTextPlugin('styles.css');
	return {
		

		entry: "./src/app.js", /* entry: "./src/app.js",  ./src/redux/runRedux.js */
		mode: "development",
		output: {
			path: __dirname + "/public",
			publicPath: '/',
			filename: 'bundle.js'
		},
		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.js$/,
					exclude: /node_modules/				
				},
				{
					test: /\.s?css$/,				
					use: CSSExtract.extract({
						use: [
						  {
							loader: 'css-loader',
							options: {
							  sourceMap: true
							}
						  },
						  {
							loader: 'sass-loader',
							options: {
							  sourceMap: true
							}
						  }
						]
					  })
				}
			]
		},
		plugins: [CSSExtract],
		devtool: (isProduction) ? 'source-map' : 'inline-source-map',
		devServer: { 
			contentBase: (__dirname + "/public"), 
			historyApiFallback: true
		}
	}
}