const path = require("path");

module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
webpack: config => {
  config.resolve.alias['~'] = path.resolve(__dirname);
  return config;
},
  // 配置图片的域名
  images: {
    domains: ["cdn.pixabay.com", "www.7miaoyu.com"],
    deviceSizes: [1000, 1280],
    imageSizes: [900, 530],
  },
};

