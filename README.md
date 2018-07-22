# Static Webpack

A basic Webpack configuration to create simple static sites with Handlebars (or HTML or Pug) and SCSS.

## Usage

#### Clone

```
git clone https://github.com/sntiagomoreno/static-webpack.git static-site
```

#### Remove Git

Get into your project folder:

```
cd my-site
```

Remove this repo versioning files

```
rm -rf .git
```

### Install Dependencies

```
yarn install
```

### For Development

This enables webpack-dev-server for Hot Module Replacement. It also uses browser-sync for a quick way of accessing your site from an external IP. [See more browser-sync options](https://browsersync.io/docs/options).

```
yarn dev
```

### For Production

```
yarn build
```

## Featured Dependencies

Besides browser-sync and webpack-dev-server, this projects ships with some cool dependencies.

-   [postcss-loader](https://github.com/postcss/postcss-loader)
-   [css-mqpacker](https://github.com/hail2u/node-css-mqpacker) (postcss plugin)
-   [normalize.css](https://github.com/necolas/normalize.css/)
