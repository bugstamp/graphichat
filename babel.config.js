module.exports = (api) => {
  const presets = [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: {
        version: '3.1.4',
        proposals: true,
      },
      debug: true,
      targets: {
        node: 'current',
      },
    }],
    '@babel/preset-react',
  ];
  const plugins = [
    'lodash',
    'jsx-control-statements',
    'babel-plugin-styled-components',
    ['@babel/plugin-transform-runtime', { corejs: 3 }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-syntax-dynamic-import',
  ];

  if (api.env('development')) {
    plugins.push('react-hot-loader/babel');
  }

  return {
    presets,
    plugins,
  };
};
