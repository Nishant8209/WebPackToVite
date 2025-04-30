const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production', // Use 'development' during development
  entry: './src/ExternalApp.tsx',  // Entry point where components are exposed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
    library: {
      name: 'ExternalApp',
      type: 'umd',
      export: 'default',
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  // Add externals to avoid bundling React and ReactDOM
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};