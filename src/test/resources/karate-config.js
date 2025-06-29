function fn() {
  // Cargar archivos de datos organizados por categorías
  var endpointsData = read('classpath:data/api/endpoints.json');
  var tokenAddresses = read('classpath:data/tokens/token-addresses.json');
  var sortParams = read('classpath:data/tokens/sort-params.json');
  var paginationParams = read('classpath:data/tokens/pagination-params.json');
  var ohlcvParams = read('classpath:data/trading/ohlcv-params.json');
  var tradeAddresses = read('classpath:data/trading/trade-addresses.json');
  
  return {
    baseUrl: 'https://full-api.cloud-service-app.com',
    // Configuración de timeout para evitar timeouts largos
    connectTimeout: 30000,
    readTimeout: 30000,
    
    // Datos cargados desde archivos organizados
    endpoints: endpointsData,
    tokenAddresses: tokenAddresses,
    sortParams: sortParams,
    paginationParams: paginationParams,
    ohlcvParams: ohlcvParams,
    tradeAddresses: tradeAddresses,
    
    // Funciones helper para acceder a los datos
    getEndpoint: function(name) {
      return endpointsData.endpoints[name];
    },
    
    // ===== HELPERS DE TOKENS =====
    getSortParams: function(type, index) {
      return sortParams[type][index];
    },
    
    getPaginationParams: function(type, index) {
      return paginationParams[type][index];
    },
    
    getValidToken: function(index) {
      return tokenAddresses.valid_tokens[index];
    },
    
    getInvalidToken: function(index) {
      return tokenAddresses.invalid_tokens[index];
    },
    
    // ===== HELPERS DE TRADING =====
    getOHLCVParams: function(index) {
      return ohlcvParams[index];
    },
    
    getTradeAddress: function(index) {
      return tradeAddresses.addresses[index];
    }
  };
}
