const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add comprehensive Node.js polyfills for React Native
config.resolver.alias = {
  crypto: 'crypto-browserify',
  stream: 'stream-browserify',
  vm: 'vm-browserify',
  util: 'util',
  zlib: 'zlib-browserify',
  buffer: 'buffer',
  process: 'process',
  events: 'events',
  path: 'path-browserify',
  os: 'os-browserify',
  url: 'url',
  assert: 'assert',
  querystring: 'querystring',
  punycode: 'punycode',
};

// Add global polyfills
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;

