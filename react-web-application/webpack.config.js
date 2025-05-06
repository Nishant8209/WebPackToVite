const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: './src/index.ts',  // Entry point where components are exposed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    library: {
      name: 'ExternalApp', // The name to expose the components
      type: 'umd', // UMD (Universal Module Definition) to support various environments
      export: 'default', // Expose the default export
    },
    globalObject: 'this', // Ensures compatibility in both browser and Node.js environments
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Enable cross-origin requests
    },
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};
