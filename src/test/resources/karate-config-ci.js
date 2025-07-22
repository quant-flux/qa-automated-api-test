function fn() {
  var env = karate.env || 'ci';
  var config = {
    baseUrl: 'https://full-api.cloud-service-app.com',
    // Timeouts ultra-agresivos para CI/CD
    connectTimeout: 3000,
    readTimeout: 3000,
    // Configuración para fallar rápido
    retry: { count: 0, interval: 0 }
  };

  // Carga lazy de archivos - solo cargar cuando se necesiten
  config.loadEndpoints = function() {
    if (!config._endpoints) {
      config._endpoints = read('classpath:data/api/endpoints.json').endpoints;
    }
    return config._endpoints;
  };

  config.loadTokenAddresses = function() {
    if (!config._tokenAddresses) {
      config._tokenAddresses = read('classpath:data/tokens/token-addresses.json');
    }
    return config._tokenAddresses;
  };

  // Funciones optimizadas
  config.getEndpoint = function(name) { 
    return config.loadEndpoints()[name]; 
  };

  config.getValidToken = function(index) {
    var addresses = config.loadTokenAddresses();
    if (addresses && addresses.valid_tokens && addresses.valid_tokens[index]) {
      return addresses.valid_tokens[index];
    }
    return '0x1234567890123456789012345678901234567890'; // fallback
  };

  config.getValidTokenAddress = function(index) {
    var addresses = config.loadTokenAddresses();
    if (addresses && addresses.valid_addresses && addresses.valid_addresses[index]) {
      return addresses.valid_addresses[index];
    }
    return '0x1234567890123456789012345678901234567890'; // fallback
  };

  // Configuración específica para CI
  if (env === 'ci') {
    config.connectTimeout = 2000;
    config.readTimeout = 2000;
    config.retry = { count: 0, interval: 0 };
  }

  return config;
} 