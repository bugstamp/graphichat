module.exports = (api) => {
  const isDevelopment = api.env('development');
  api.cache(true);

  const presets = [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: {
        version: '3.1.4',
        proposals: true,
      },
      debug: isDevelopment,
    }],
  ];
  const plugins = [
    'lodash',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
  ];

  return {
    only: ['src'],
    presets,
    plugins,
  };
};
