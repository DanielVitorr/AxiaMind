const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Configurações para o MMKV funcionar
config.resolver.assetExts.push("db"); // Para arquivos de banco de dados
config.resolver.sourceExts.push("cjs"); // Para CommonJS modules

// Configuração importante para bibliotecas nativas
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  stream: require.resolve("stream-browserify"),
  crypto: require.resolve("crypto-browserify"),
};

module.exports = config;
