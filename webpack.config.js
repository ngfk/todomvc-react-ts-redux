const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const project           = require('./package.json');

module.exports = {

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
        alias: {
            'app': path.join(__dirname, 'src')
        }
    },

    entry: {
        vendor: [
            'react',
            'react-dom'
        ],
        app: path.join(__dirname, 'src', 'index.tsx')
    },

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        path: path.join(__dirname, 'dist')
    },


    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'awesome-typescript-loader',
                        options: { silent: true, useBabel: true, babelOptions: project.babel }
                    }
                ]
            },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor'] }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html')
        })
    ],

    devServer: {
        port: 9000,
        contentBase: './src'
    }
};
