module.exports = {
    // Config for static sites only
    // Set staticSite to false if working with React, Angular
    // or any other JS framework for building UIs
    staticSite: true,
    // Choose between html, pug, hbs, ejs or any other extension
    // html-loader, pug-loader and handlebars-loader are installed by default. If
    // you're using any other extension be sure to install the
    // appropiate loader.
    // https://github.com/jantimon/html-webpack-plugin/blob/master/docs/template-option.md
    extension: 'hbs',
    // 'body', 'head' or false
    inject: 'body',
    // Static site pages to generate
    pages: [{
            title: 'Home',
            filename: 'index' // Make sure to write it extensionless
        },
        {
            title: 'About',
            filename: 'about'
        }
    ]
};
