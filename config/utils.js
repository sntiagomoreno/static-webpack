const path = require('path');
const config = require('./global.config')
const pages = require('./pages.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.resolve = function (dir) {
    return path.join(__dirname, '..', dir);
}

exports.generatePages = function () {
    const htmlPages = pages.pages;
    const output = [];

    for (page in htmlPages) {
        const pagename = htmlPages[page];

        output.push(
            new HtmlWebpackPlugin({
                filename: pagename.filename + '.html',
                title: pagename.title,
                template: config.dev.htmlSubDirectory + pagename.filename + '.' + pages.extension,
                inject: pages.inject
            })
        );
    }
    return output;
};

exports.rewrites = function () {
    const htmlPages = pages.pages;
    const output = [];

    for (page in htmlPages) {
        const pagename = htmlPages[page];
        const regex = new RegExp('^/' + pagename.filename);
        output.push({
            from: regex,
            to: '/' + pagename.filename + '.html'
        });
    }
    return output;
};
