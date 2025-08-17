// Import required polyfills for Privy
import 'fast-text-encoding';
import 'react-native-get-random-values';
import '@ethersproject/shims';

// Comprehensive Node.js polyfills for React Native
import 'node-libs-react-native/globals';

// Global polyfills
global.Buffer = require('buffer').Buffer;
global.process = require('process');

