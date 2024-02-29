// const webpack = require("webpack");
import webpack from "webpack";
import dotenv from "dotenv";
const { parsed: myEnv } = dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: process.env.WHITE_LIST_IMAGE_URLS.split(","),
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(myEnv));
    return config;
  },
};

export default nextConfig;
