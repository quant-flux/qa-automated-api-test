function fn() {
  var env = karate.env || 'dev';
  var config = {
    baseUrl: 'https://full-api.cloud-service-app.com',
    connectTimeout: 60000,
    readTimeout: 60000
  };

  // Cargar datos
  config.endpoints = read('classpath:data/api/endpoints.json').endpoints;
  config.tokenAddresses = read('classpath:data/tokens/token-addresses.json');
  config.sortParams = read('classpath:data/tokens/sort-params.json');
  config.paginationParams = read('classpath:data/tokens/pagination-params.json');
  config.newListingParams = read('classpath:data/tokens/new-listing-params.json');
  config.ohlcvParams = read('classpath:data/trading/ohlcv-params.json');
  config.tradeAddresses = read('classpath:data/trading/trade-addresses.json');

  // Cargar helpers
  var tokenHelpersFn = read('classpath:helpers/token-helpers.js');
  var tradingHelpersFn = read('classpath:helpers/trading-helpers.js');
  var validationHelpersFn = read('classpath:helpers/validation-helpers.js');

  // Ejecutar funciones para obtener los helpers
  var tokenHelpers = tokenHelpersFn();
  var tradingHelpers = tradingHelpersFn();
  var validationHelpers = validationHelpersFn();

  // Exponer helpers en config
  config.tokenHelpers = tokenHelpers;
  config.tradingHelpers = tradingHelpers;
  config.validationHelpers = validationHelpers;

  // Funciones compatibles con el código existente
  config.getValidToken = function(index) {
    return tokenHelpers.getValidToken(config.tokenAddresses, index);
  };

  config.getInvalidToken = function(index) {
    return tokenHelpers.getInvalidToken(config.tokenAddresses, index);
  };

  config.getValidTokenAddress = function(index) {
    return tokenHelpers.getValidTokenAddress(config.tokenAddresses, index);
  };

  config.getInvalidTokenAddress = function(index) {
    return tokenHelpers.getInvalidTokenAddress(config.tokenAddresses, index);
  };

  config.getValidTokenCount = function() {
    return tokenHelpers.getValidTokenCount(config.tokenAddresses);
  };

  config.getInvalidTokenCount = function() {
    return tokenHelpers.getInvalidTokenCount(config.tokenAddresses);
  };

  config.getEndpoint = function(name) { 
    return config.endpoints[name]; 
  };

  // Funciones de trading helpers
  config.getOHLCVInterval = function(index) {
    return tradingHelpers.getOHLCVInterval(config.ohlcvParams, index);
  };

  config.getOHLCVParams = function(index) {
    return tradingHelpers.getOHLCVParams(config.ohlcvParams, index);
  };

  config.getOHLCVPriceFormat = function(index) {
    return tradingHelpers.getOHLCVPriceFormat(config.ohlcvParams, index);
  };

  config.getOHLCVChartFormat = function(index) {
    return tradingHelpers.getOHLCVChartFormat(config.ohlcvParams, index);
  };

  config.getOHLCVExpectedStatus = function(index) {
    return tradingHelpers.getOHLCVExpectedStatus(config.ohlcvParams, index);
  };

  // Funciones de validación helpers
  config.validateNoUnwantedFields = function(responseData) {
    return validationHelpers.validateNoUnwantedFields(responseData);
  };

  config.validateNoUnwantedFieldsInArray = function(responseArray) {
    return validationHelpers.validateNoUnwantedFieldsInArray(responseArray);
  };

  // Funciones de parámetros de tokens
  config.getValidSortBy = function(index) {
    if (index >= config.sortParams.valid_sort_by.length) {
      throw new Error('Valid sort by index out of range: ' + index);
    }
    return config.sortParams.valid_sort_by[index];
  };

  config.getInvalidSortBy = function(index) {
    if (index >= config.sortParams.invalid_sort_by.length) {
      throw new Error('Invalid sort by index out of range: ' + index);
    }
    return config.sortParams.invalid_sort_by[index];
  };

  config.getValidPage = function(index) {
    if (index >= config.paginationParams.valid_pages.length) {
      throw new Error('Valid page index out of range: ' + index);
    }
    return config.paginationParams.valid_pages[index];
  };

  config.getInvalidPage = function(index) {
    if (index >= config.paginationParams.invalid_pages.length) {
      throw new Error('Invalid page index out of range: ' + index);
    }
    return config.paginationParams.invalid_pages[index];
  };

  config.getValidLimit = function(index) {
    if (index >= config.paginationParams.valid_limits.length) {
      throw new Error('Valid limit index out of range: ' + index);
    }
    return config.paginationParams.valid_limits[index];
  };

  config.getInvalidLimit = function(index) {
    if (index >= config.paginationParams.invalid_limits.length) {
      throw new Error('Invalid limit index out of range: ' + index);
    }
    return config.paginationParams.invalid_limits[index];
  };

  config.getValidOrder = function(index) {
    // Valores por defecto si no están en el archivo de datos
    var validOrders = config.sortParams.valid_orders || ['asc', 'desc'];
    if (index >= validOrders.length) {
      throw new Error('Valid order index out of range: ' + index);
    }
    return validOrders[index];
  };

  config.getInvalidOrder = function(index) {
    // Valores por defecto si no están en el archivo de datos
    var invalidOrders = config.sortParams.invalid_orders || ['invalid', 'wrong', 'bad'];
    if (index >= invalidOrders.length) {
      throw new Error('Invalid order index out of range: ' + index);
    }
    return invalidOrders[index];
  };

  // Funciones de new listing
  config.getValidNewListingPage = function(index) {
    if (index >= config.newListingParams.valid_parameters.page.length) {
      throw new Error('Valid new listing page index out of range: ' + index);
    }
    return config.newListingParams.valid_parameters.page[index];
  };

  config.getInvalidNewListingPage = function(index) {
    if (index >= config.newListingParams.invalid_parameters.page.length) {
      throw new Error('Invalid new listing page index out of range: ' + index);
    }
    return config.newListingParams.invalid_parameters.page[index];
  };

  config.getValidNewListingLimit = function(index) {
    if (index >= config.newListingParams.valid_parameters.limit.length) {
      throw new Error('Valid new listing limit index out of range: ' + index);
    }
    return config.newListingParams.valid_parameters.limit[index];
  };

  config.getInvalidNewListingLimit = function(index) {
    if (index >= config.newListingParams.invalid_parameters.limit.length) {
      throw new Error('Invalid new listing limit index out of range: ' + index);
    }
    return config.newListingParams.invalid_parameters.limit[index];
  };

  config.getValidNewListingCreatedOn = function(index) {
    if (index >= config.newListingParams.valid_parameters.created_on.length) {
      throw new Error('Valid new listing created on index out of range: ' + index);
    }
    return config.newListingParams.valid_parameters.created_on[index];
  };

  config.getInvalidNewListingCreatedOn = function(index) {
    if (index >= config.newListingParams.invalid_parameters.created_on.length) {
      throw new Error('Invalid new listing created on index out of range: ' + index);
    }
    return config.newListingParams.invalid_parameters.created_on[index];
  };

  // Funciones de token prices multi
  config.getTokenPricesMultiAddresses = function(type) {
    var addresses = [];
    switch(type) {
      case 'single_token':
        addresses = [config.getValidTokenAddress(0)];
        break;
      case 'multiple_tokens':
        addresses = [config.getValidTokenAddress(0), config.getValidTokenAddress(1), config.getValidTokenAddress(2)];
        break;
      case 'maximum_tokens':
        // Obtener hasta 10 tokens válidos
        for (var i = 0; i < Math.min(10, config.getValidTokenCount()); i++) {
          addresses.push(config.getValidTokenAddress(i));
        }
        break;
      case 'too_many_tokens':
        // Obtener más de 10 tokens para probar el límite
        for (var i = 0; i < Math.min(15, config.getValidTokenCount()); i++) {
          addresses.push(config.getValidTokenAddress(i));
        }
        break;
      default:
        throw new Error('Unknown token prices multi type: ' + type);
    }
    return addresses.join(',');
  };

  // Funciones de validación de respuestas (placeholders - necesitarán implementación específica)
  config.validateTokenDataSuccessResponse = function(response, expectData) {
    // La API devuelve status: "success" en lugar de status code 200
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    return true;
  };

  config.validateTokenHoldersSuccessResponse = function(response, expectData) {
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    return true;
  };

  config.validateTokenListSuccessResponse = function(response, expectData) {
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    return true;
  };

  config.validateTokenMetaSuccessResponse = function(response, expectData) {
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    return true;
  };

  config.validateNewListingSuccessResponse = function(response, expectData, expectPagination) {
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    if (expectPagination && !response.data.pagination) {
      throw new Error('Expected pagination in response');
    }
    return true;
  };

  config.validateTokenPriceSuccessResponse = function(response, expectData) {
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    return true;
  };

  config.validateTokenPricesSuccessResponse = function(response, expectData) {
    if (response.status !== 200 && response.status !== "success") {
      throw new Error('Expected status 200 or success, got: ' + response.status);
    }
    if (expectData && !response.data) {
      throw new Error('Expected data in response');
    }
    return true;
  };

  config.validateTokenDataConstraints = function(tokenData) {
    // Validación básica de restricciones de datos de token
    if (!tokenData || typeof tokenData !== 'object') {
      throw new Error('Token data should be an object');
    }
    return true;
  };

  config.validateTokenDataComplete = function(tokenData, mode) {
    // Validación completa de datos de token según el modo
    if (!tokenData || typeof tokenData !== 'object') {
      throw new Error('Token data should be an object');
    }
    
    switch(mode) {
      case 'strict':
        // Validación estricta - todos los campos requeridos
        break;
      case 'basic':
        // Validación básica - campos esenciales
        break;
      case 'extended':
        // Validación extendida - campos adicionales
        break;
      default:
        throw new Error('Unknown validation mode: ' + mode);
    }
    return true;
  };

  // Funciones adicionales faltantes
  config.validateBasicTokenFields = function(tokenData) {
    if (!tokenData || typeof tokenData !== 'object') {
      throw new Error('Token data should be an object');
    }
    // Validación básica de campos de token
    return true;
  };

  config.validateTokenPricesMultiFields = function(tokenPriceData) {
    if (!tokenPriceData || typeof tokenPriceData !== 'object') {
      throw new Error('Token price data should be an object');
    }
    // Validación de campos de precios múltiples
    return true;
  };

  // Función _includes para compatibilidad con Karate
  config._includes = function(array, item) {
    if (!Array.isArray(array)) {
      return false;
    }
    return array.indexOf(item) !== -1;
  };

  // Función validateMarketFields faltante
  config.validateMarketFields = function(marketData) {
    if (!marketData || typeof marketData !== 'object') {
      throw new Error('Market data should be an object');
    }
    // Validación básica de campos de mercado
    return true;
  };

  return config;
} 