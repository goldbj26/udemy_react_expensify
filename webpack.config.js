// entry (app.js) -> output


//const path_public = 
//console.log(path_public);

module.exports = {
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
				use: ['style-loader','css-loader','sass-loader']
			}
		]
	},
	devtool: 'cheap-module-eval-source-map',
	devServer: { 
		contentBase: (__dirname + "/public"), 
		historyApiFallback: true
	}
}