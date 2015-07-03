var path = require("path");

module.exports = {

  resolve: {
    root: path.join(__dirname, "client")
  },

  entry: {
    app: ['app.jsx']
  },

  output: {
    path: './build',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      { test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
    ]
  },

  devtool: 'source-map'

};
