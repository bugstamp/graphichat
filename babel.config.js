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
    // 'polished',
    'jsx-control-statements',
    'babel-plugin-styled-components',
    '@babel/plugin-syntax-dynamic-import',
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
