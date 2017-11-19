const path = require("path");
const webpack = require("webpack");

const config = {
  context: __dirname,
  entry: [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:8080",
    "webpack/hot/only-dev-server",
    "./client/index.js"
  ],

  devtool: "cheap-eval-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "bundle.js",
    publicPath: "/public/"
  },
  devServer: {
    hot: true,
    publicPath: "/public/",
    historyApiFallback: true
  },
  resolve: {
    extensions: [".js", ".jsx", "json"]
    // alias: {
    //   react: "preact-compat",
    //   "react-dom": "preact-compat"
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve("client")
          //  path.resolve("node_modules/preact-compat/src")
        ]
      }
    ]
  }
};

if (process.env.NODE_ENV === "production") {
  config.entry = "./client/index.js";
  config.devtool = false;
  config.plugins = [];
}

module.exports = config;
