module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
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
          },
        },
      ],
    ],
  };
};

