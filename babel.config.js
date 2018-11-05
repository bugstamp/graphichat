module.exports = (api) => {
  const presets = [
    ['@babel/preset-env', {
      modules: false,
      useBuiltIns: 'entry',
      debug: true,
    }],
    '@babel/preset-react',
  ];
  const plugins = [
    'lodash',
    'jsx-control-statements',
    'babel-plugin-styled-components',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-transform-runtime',
  ];

  if (api.env('development')) {
    plugins.push('react-hot-loader/babel');
  }

  return {
    presets,
    plugins,
  };
};
