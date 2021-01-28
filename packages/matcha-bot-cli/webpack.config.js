var path = require("path")

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  mode: "production",
  devtool: "inline-source-map",
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".js"] //resolve all the modules other than index.ts,
  },
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        test: /\.ts?$/,
        exclude: [
          path.resolve(__dirname, "./bin"),
          path.resolve(__dirname, "./node_modules")
        ]
      },
      {
        test: /\.(flf)$/i,
        loader: "file-loader",
        options: {
          outputPath: "../fonts",
          name: '[name].[ext]',
        }
      }
    ]
  }
}
