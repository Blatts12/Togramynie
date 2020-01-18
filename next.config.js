require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack: (config, { isServer }) => {
    config.plugins = config.plugins || [];
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    if (!isServer) {
      config.node = {
        fs: "empty"
      };
    }

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    return config;
  }
};
