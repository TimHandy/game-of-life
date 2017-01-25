const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'App.jsx' ),
  output: {
    path: 'docs',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      AddRecipe: 'src/components/AddRecipe.jsx',
      RecipeList: 'src/components/RecipeList.jsx'
    },
    extensions: ['', '.js', '.jsx']
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,  // regex to select only .css files
        loader: 'style-loader!css-loader!sass-loader'			// the sass-loader converts the sass into css, the css-loader puts that css into the javascript, the style-loader then puts the javascript into the DOM.
      }
    ]
  },
  devServer: {    // npm i -D webpack-dev-server
    contentBase: path.join(__dirname, 'src'),
    inline: true    // removes the iframe around the webpage
  },
  plugins: [
    new HtmlWebpackPlugin({ // npm i -D html-webpack-plugin. Enables specifying location of index.html file... so can put in src and don't require the build dir for development, i.e. don't have to run webpack.
      template: path.join(__dirname, 'src', 'index.html'),
      inject: false   // this is required, otherwise the code gets injected twice
    })
  ]
}
