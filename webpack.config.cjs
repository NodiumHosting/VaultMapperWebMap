const path = require("path");
const HtmlWebpackInlineSourcePlugin = require("@effortlessmotion/html-webpack-inline-source-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				// inline base64 png
				test: /\.png$/,
				type: "asset/inline",
			},
		],
	},
	resolve: {
		extensions: [".js", ".ts"],
	},
	output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: "body",
			template: "./src/webmap.html",
			filename: `webmap-v${require("./src/WEBMAP_VERSION.js").WEBMAP_VERSION}.html`,
			minify: true,
			inlineSource: ".(js|css)$",
		}),
		new HtmlWebpackInlineSourcePlugin(),
	],
	mode: "none",
};
