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

// Aggressive resolver to handle deep dependencies
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'cjs'];

// Custom resolver function to intercept Node.js modules
const originalResolveRequest = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Intercept crypto imports from any package
  if (moduleName === 'crypto') {
    return {
      filePath: require.resolve('crypto-browserify'),
      type: 'sourceFile',
    };
  }
  
  // Intercept util imports
  if (moduleName === 'util') {
    return {
      filePath: require.resolve('util'),
      type: 'sourceFile',
    };
  }
  
  // Intercept zlib imports
  if (moduleName === 'zlib') {
    return {
      filePath: require.resolve('zlib-browserify'),
      type: 'sourceFile',
    };
  }
  
  // Fall back to default resolver
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;

