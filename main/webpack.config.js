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
    port: 3000,
    historyApiFallback: true,
    allowedHosts: ["all"]
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
      name: "main",
      filename: "remoteEntry.js",
      remotes: {
        //   store: `store@${process.env.STORE_BASE_URL || 'http://localhost:3030'}/remoteEntry.js`,
        //   auth: `auth@${process.env.AUTH_BASE_URL || 'http://localhost:3002'}/remoteEntry.js`,
        //   domains: `domains@${process.env.DOMAINS_BASE_URL || 'http://localhost:3001'}/remoteEntry.js`,
        //   billinghistory: `billinghistory@${process.env.HISTORY_BASE_URL || 'http://localhost:3010'}/remoteEntry.js`,
        //   payments: `payments@${process.env.PAYMENTS_BASE_URL || 'http://localhost:3007'}/remoteEntry.js`,
        //   settings: `settings@${process.env.SETTINGS_BASE_URL || 'http://localhost:3006'}/remoteEntry.js`,
        //   email: `email@${process.env.EMAIL_BASE_URL || 'http://localhost:3003'}/remoteEntry.js`,
        
        // store: `store@http://localhost:3030/remoteEntry.js`,
        // auth: `auth@http://localhost:3002/remoteEntry.js`,
        // domains: `domains@http://localhost:3001/remoteEntry.js`,
        // billinghistory: `billinghistory@http://localhost:3010/remoteEntry.js`,
        // payments: `payments@http://localhost:3007/remoteEntry.js`,
        // settings: `settings@http://localhost:3006/remoteEntry.js`,
        // email: `email@http://localhost:3003/remoteEntry.js`,

        store: `store@https://store.customer.gworkspace.withhordanso.com/remoteEntry.js`,
        auth: `auth@https://auth.customer.gworkspace.withhordanso.com/remoteEntry.js`,
        domains: `domains@https://domain.customer.gworkspace.withhordanso.com/remoteEntry.js`,
        billinghistory: `billinghistory@https://billinghistory.customer.gworkspace.withhordanso.com/remoteEntry.js`,
        payments: `payments@https://payments.customer.gworkspace.withhordanso.com/remoteEntry.js`,
        settings: `settings@https://settings.customer.gworkspace.withhordanso.com/remoteEntry.js`,
        email: `email@https://email.customer.gworkspace.withhordanso.com/remoteEntry.js`,
      },
      exposes: {
        "./Navbar": "./src/components/Navbar.tsx",
        "./Header": "./src/components/Header.tsx",
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