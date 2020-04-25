const path = require('path');
const webpack = require('webpack');
// process.env.NODE_ENV = 'production';

module.exports = {
    name: 'responseCheck-setting',
    mode: 'development', //실서비스: production
    devtool: 'eval', //실서비스: hidden-source.map
    resolve: {
        extensions: ['.js', '.jsx']
    },
    entry: {
        app: ['./client']
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            // 지원하는 브라우저
                            // github.com/browerslist
                            browsers: ['>5% in KR']
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-hot-loader/babel'
                ]
            }
        }]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
        publicPath: '/dist/',
    }
};