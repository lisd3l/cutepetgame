const webpack = require("webpack");

// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer"), require("postcss-nested"), require("postcss-at2x")()],
    },
  },
  plugins: [
    {
      plugin: require("craco-less"),
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  eslint: {
    mode: "file",
  },
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          process: "process/browser.js",
        }),
      ],
    },
  },
};
