// Global type declarations for Node.js polyfills
declare module 'crypto-browserify';
declare module 'stream-browserify';
declare module 'vm-browserify';
declare module 'zlib-browserify';
declare module 'path-browserify';
declare module 'os-browserify';
declare module 'node-libs-react-native/globals';

// Global variables
declare global {
  var Buffer: any;
  var process: any;
}

