const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  webpack: (cfg, { isServer, webpack }) => {
    const config = cfg;

    if (!isServer) {
      // 在浏览器端，忽略这些模块的打包
      const ignoreList = ["fs"];
      ignoreList.forEach((n) => {
        config.plugins.push(
          new webpack.IgnorePlugin({ resourceRegExp: new RegExp(n) })
        );
      });
    }

    return config;
  },
  // 配置图片的域名
  images: {
    domains: ["cdn.pixabay.com", "www.7miaoyu.com"],
    deviceSizes: [1000, 1280],
    imageSizes: [900, 530],
  },
};
