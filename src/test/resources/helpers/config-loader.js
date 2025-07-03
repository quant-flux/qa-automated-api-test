function loadConfig() {
  var env = karate.env || 'dev';
  var config = {
    baseUrl: 'https://full-api.cloud-service-app.com',
    connectTimeout: 60000,
    readTimeout: 60000
  };
  config.endpoints = read('classpath:data/api/endpoints.json').endpoints;
  config.tokenAddresses = read('classpath:data/tokens/token-addresses.json');
  config.sortParams = read('classpath:data/tokens/sort-params.json');
  config.paginationParams = read('classpath:data/tokens/pagination-params.json');
  config.ohlcvParams = read('classpath:data/trading/ohlcv-params.json');
  config.tradeAddresses = read('classpath:data/trading/trade-addresses.json');
  return config;
} 