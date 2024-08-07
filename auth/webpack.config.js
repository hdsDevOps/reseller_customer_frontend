const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
	output: {
		publicPath: "auto",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},

	devServer: {
		port: 3002,
		historyApiFallback: true,
		allowedHosts: ["all"],
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "auth",
			filename: "remoteEntry.js",
			remotes: {
				store: "store@http://localhost:3030/remoteEntry.js",
			},
			exposes: {
				"./AuthApp": "./src/pages/index.tsx",
				"./AuthCss": "./src/auth.css",
			},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
		new Dotenv(),
	],
});
