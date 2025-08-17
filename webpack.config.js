const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Add Node.js polyfills for web
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: require.resolve('crypto-browserify'),
    stream: require.resolve('stream-browserify'),
    vm: require.resolve('vm-browserify'),
    util: require.resolve('util'),
    zlib: require.resolve('zlib-browserify'),
    buffer: require.resolve('buffer'),
    process: require.resolve('process'),
    events: require.resolve('events'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify'),
    url: require.resolve('url'),
    assert: require.resolve('assert'),
    querystring: require.resolve('querystring'),
    punycode: require.resolve('punycode'),
  };
  
  return config;
};

