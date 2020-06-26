const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[path][name]_[local]-[hash:base64:5]',
  },
  env: {
    PUBLIC_KEY: process.env.PUBLIC_KEY,
    PRIV_KEY: process.env.PRIV_KEY,
  },
});
