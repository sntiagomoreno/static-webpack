const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const utils = require('./utils');
const config = require('./global.config');

module.exports = {
    entry: config.entry,
    mode: 'production',
    resolve: {
        alias: {
            'img': utils.resolve('src/assets/images'),
            'media': utils.resolve('src/assets/media'),
            'assets': utils.resolve('src/assets'),
            '@': utils.resolve('src/scripts'),
            'styles': utils.resolve('src/styles')
        }
    },
    output: {
        path: utils.resolve('dist'),
        filename: '[name].[contenthash].min.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    comments: false
                }
            })
        ]
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                include: [
                    config.dev.sourceDirectory, // + any other paths that need to be transpiled
                    /\/node_modules\/smooth-scrolling/
                ],
                use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
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
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            // modules: true,
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: loader => [
                                require('autoprefixer'),
                                require('css-mqpacker')({
                                    sort: true
                                }),
                                require('postcss-pxtorem')({
                                    propList: ['*'],
                                    mediaQuery: true
                                }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'compressed'
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    plugins: utils.generatePages().concat([
        new CleanWebpackPlugin(config.build.publicRoot, {
            exclude: ['static'],
            root: config.build.root
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].min.css',
            chunkFilename: '[id].css'
        }),
        // copy custom static assets
        new CopyWebpackPlugin([{
            from: config.dev.staticAssets,
            to: config.build.assetsSubDirectory,
            ignore: ['.*']
        }])
    ])
};
