/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript');
const withCss = require('@zeit/next-css');

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: './bundles/client.html',
    },
  },
  webpack(config, options) {
    // to avoid duplicating deps on every chunk
    const { isServer, dev } = options;
    if (!isServer && !dev) {
      const cacheGroups = config.optimization.splitChunks.cacheGroups;

      delete cacheGroups.react;

      cacheGroups.default = false;

      cacheGroups.vendors = {
        name: 'vendors',
        test: /[\\/](node_modules|packages)[\\/]/,
        enforce: true,
        priority: 20,
      };

      cacheGroups.commons = {
        name: 'commons',
        minChunks: 2,
        priority: 10,
      };
    }
    return config;
  },
};

const wcss = withCss({
  webpack: config => {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: './',
          outputPath: 'static/css/',
          name: '[name].[ext]',
        },
      },
    });
    return config;
  },
});

module.exports = withTypescript({
  ...wcss,
  ...withBundleAnalyzer(nextConfig),
});
