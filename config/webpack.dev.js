const webpack = require('webpack');
const utils = require('./utils');
const config = require('./global.config');

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: config.entry,
    mode: 'development',
    devServer: {
        contentBase: config.dev.contentBase,
        compress: config.dev.compress,
        clientLogLevel: 'error',
        stats: 'errors-only',
        // Pretty urls
        historyApiFallback: {
            rewrites: utils.rewrites()
        }
    },
    devtool: config.dev.devtool,
    resolve: {
        alias: {
            'img': utils.resolve('src/assets/images'),
            'media': utils.resolve('src/assets/media'),
            'assets': utils.resolve('src/assets'),
            '@': utils.resolve('src/scripts'),
            'styles': utils.resolve('src/styles')
        }
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                include: [
                    config.dev.sourceDirectory, // + any other paths that need to be transpiled
                ],
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    'webpack-module-hot-accept'
                ]
            },
            {
                test: /\.(pug|jade)$/,
                use: [{
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }]
            },
            {
                test: /\.(handlebars|hbs)$/,
                loader: 'handlebars-loader',
                options: {
                    partialDirs: [
                        (config.dev.htmlSubDirectory + '../partials'),
                        (config.dev.htmlSubDirectory + '../helpers'),
                        (config.dev.htmlSubDirectory + '../includes')
                    ]
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer'),
                                require('postcss-pxtorem')({
                                    propList: ['*'],
                                    mediaQuery: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'dist/img/[name].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'dist/media/[name].[ext]'
                }
            }
        ]
    },
    plugins: utils.generatePages().concat([
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.

        // copy custom static assets
        new CopyWebpackPlugin({
            patterns: [{
                from: config.dev.staticAssets,
                to: config.build.assetsSubDirectory
            }]
        }),
    ])
};
