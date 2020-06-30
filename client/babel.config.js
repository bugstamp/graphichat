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
    '@babel/preset-react',
  ];

  const plugins = [
    'lodash',
    'jsx-control-statements',
    'babel-plugin-styled-components',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
    'react-imported-component/babel',
  ];

  if (isDevelopment) {
    plugins.push('react-hot-loader/babel');
  }

  return {
    only: ['src'],
    presets,
    plugins,
  };
};
