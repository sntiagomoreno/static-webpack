const path = require('path');
const utils = require('./utils')

utils.resolve = function (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    // General config for dev and build environments
    // Same entry object for webpack's entry
    entry: {
        main: [
            utils.resolve('src/scripts/main.js'),
            utils.resolve('src/styles/main.scss')
        ]
    },
    dev: {
        // Paths
        staticAssets: utils.resolve('static'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        sourceDirectory: utils.resolve('src'),
        htmlSubDirectory: utils.resolve('src/views/templates/'),
        // Dev Server
        host: 'localhost',
        contentBase: utils.resolve('dist'),
        compress: true,
        port: 8080,
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
        // ESlint
        esLint: true,
        esLintErrorOverlay: false,
        // Source Maps
        devtool: 'cheap-module-eval-source-map',
        cssSourceMap: true
    },
    build: {
        root: utils.resolve('/'),
        publicRoot: utils.resolve('dist'),
        assetsSubDirectory: 'static',
    }
};
