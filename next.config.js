// const nextConfig = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     if (!isServer) {
//       config.resolve.fallback.fs = false;
//       config.resolve.fallback.tls = false;
//       config.resolve.fallback.net = false;
//       config.resolve.fallback.child_process = false;
//     }

//     return config;
//   },
//   future: {
//     webpack5: true,
//   },
//   fallback: {
//     fs: false,
//     tls: false,
//     net: false,
//     child_process: false,
//   },
// };

// module.exports = nextConfig;

// version 2:
module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty',
      child_process: 'empty',
      net: 'empty',
      dns: 'empty',
      tls: 'empty',
    };
    return config;
  },
};
