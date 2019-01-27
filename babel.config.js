module.exports = (api) => {
  const presets = [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      debug: true,
    }],
    '@babel/preset-react',
  ];
  const plugins = [
    'lodash',
    'jsx-control-statements',
    'babel-plugin-styled-components',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-class-properties',
  ];

  if (api.env('development')) {
    plugins.push('react-hot-loader/babel');
  }

  return {
    presets,
    plugins,
  };
};
