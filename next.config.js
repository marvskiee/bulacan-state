module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    config.resolve.fallback = { fs: false };

    return config;
  },
  images: { domains: ["firebasestorage.googleapis.com"] },
  // reactStrictMode: false,
  // webpack5: true,
  optimizeFonts: false,
  env: {
    MONGO_URI:
      "mongodb+srv://marvs:marvs@cluster0.q9ufs43.mongodb.net/?retryWrites=true&w=majority",
  },
};
