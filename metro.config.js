module.exports = {
  resolver: {
    extraNodeModules: {
      crypto: require.resolve('crypto-js'),
      hkdf: require.resolve('hkdf')
    }
  }
};