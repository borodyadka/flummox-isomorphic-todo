var path = require('path');
var webpack = require('webpack');

var DEBUG = process.env.NODE_ENV !== 'production';

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin()
];

if (!DEBUG) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = {
    cache: DEBUG,
    debug: DEBUG,
    target: 'web',
    devtool: DEBUG ? '#inline-source-map' : false,
    entry: {
        client: ['./client/app.js']
    },
    output: {
        path: path.resolve('public/js'),
        publicPath: '/',
        filename: 'bundle.js',
        pathinfo: false
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['transform?brfs', 'babel-loader?stage=0']
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            }
        ]
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.json', '.jsx']
    }
};

