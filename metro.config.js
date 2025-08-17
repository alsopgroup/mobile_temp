const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add crypto polyfills
config.resolver.alias = {
  crypto: 'crypto-browserify',
  stream: 'stream-browserify',
  vm: 'vm-browserify',
};

module.exports = config;

