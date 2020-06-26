const path = require('path');
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[path][name]_[local]-[hash:base64:5]',
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    config.module.rules.push({
      enforce: 'pre',
      test: /.scss$/,
      loader: 'sass-resources-loader',
      options: {
        resources: ['./styles/index.scss'],
      },
    });
    return config;
  },
});
