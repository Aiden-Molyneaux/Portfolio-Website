const { merge } = require('webpack-merge');
const common = require('./app/webpack.common.cjs');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
});