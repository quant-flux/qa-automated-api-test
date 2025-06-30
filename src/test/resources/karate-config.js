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
    
    // ===== FUNCIONES DE VALIDACIÓN DE LIMPIEZA =====
    validateNoUnwantedFields: function(responseData) {
      var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
      
      for (var i = 0; i < unwantedFields.length; i++) {
        var field = unwantedFields[i];
        if (responseData[field] !== undefined) {
          throw new Error('Unwanted field found: ' + field);
        }
      }
      return true;
    },
    
    validateNoUnwantedFieldsInArray: function(responseArray) {
      var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
      
      for (var i = 0; i < responseArray.length; i++) {
        var item = responseArray[i];
        for (var j = 0; j < unwantedFields.length; j++) {
          var field = unwantedFields[j];
          if (item[field] !== undefined) {
            throw new Error('Unwanted field found in array item ' + i + ': ' + field);
          }
        }
      }
      return true;
    },
    
    // ===== FUNCIONES DE VALIDACIÓN DE CAMPOS =====
    validatePriceVariationsFields: function(responseData) {
      var requiredFields = [
        'address', 'price', 'price_5m', 'percent_5m', 'volume_5m',
        'price_30m', 'percent_30m', 'volume_30m', 'price_1h', 'percent_1h', 'volume_1h',
        'price_6h', 'percent_6h', 'volume_6h', 'price_24h', 'percent_24h', 'volume_24h'
      ];
      
      for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (responseData[field] === undefined) {
          throw new Error('Required field missing: ' + field);
        }
        
        // Validar que los campos de precio y volumen sean números
        if (field.includes('price') || field.includes('volume')) {
          if (typeof responseData[field] !== 'number') {
            throw new Error('Field ' + field + ' should be a number, got: ' + typeof responseData[field]);
          }
        }
        
        // Validar que los campos de porcentaje sean números
        if (field.includes('percent')) {
          if (typeof responseData[field] !== 'number') {
            throw new Error('Field ' + field + ' should be a number, got: ' + typeof responseData[field]);
          }
        }
      }
      
      return true;
    },
    
    validateBasicTokenFields: function(responseData) {
      var requiredFields = ['address', 'name', 'symbol', 'decimals'];
      
      for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (responseData[field] === undefined) {
          throw new Error('Required field missing: ' + field);
        }
      }
      
      return true;
    },
    
    validateTokenDataFields: function(responseData) {
      var requiredFields = [
        'address', 'name', 'symbol', 'image', 'decimals',
        'creator', 'create_tx', 'created_time', 'total_supply', 'supply',
        'holders', 'price', 'volume_24h', 'market_cap', 'price_change_24h'
      ];
      
      for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (responseData[field] === undefined) {
          throw new Error('Required field missing: ' + field);
        }
      }
      
      return true;
    },
    
    validateMarketFields: function(responseData) {
      var marketFields = ['price', 'volume_24h', 'market_cap'];
      
      for (var i = 0; i < marketFields.length; i++) {
        var field = marketFields[i];
        if (responseData[field] === undefined) {
          throw new Error('Market field missing: ' + field);
        }
        
        if (typeof responseData[field] !== 'number') {
          throw new Error('Market field ' + field + ' should be a number, got: ' + typeof responseData[field]);
        }
      }
      
      return true;
    },
    
    validateTokenListElements: function(tokenArray) {
      if (!Array.isArray(tokenArray)) {
        throw new Error('Token list should be an array');
      }
      
      if (tokenArray.length === 0) {
        return true; // Lista vacía es válida
      }
      
      var requiredFields = ['address', 'name', 'symbol', 'decimals'];
      
      for (var i = 0; i < tokenArray.length; i++) {
        var token = tokenArray[i];
        
        for (var j = 0; j < requiredFields.length; j++) {
          var field = requiredFields[j];
          if (token[field] === undefined) {
            throw new Error('Required field missing in token ' + i + ': ' + field);
          }
        }
        
        // Validar tipos de datos
        if (typeof token.address !== 'string') {
          throw new Error('Token address should be a string, got: ' + typeof token.address);
        }
        if (typeof token.name !== 'string') {
          throw new Error('Token name should be a string, got: ' + typeof token.name);
        }
        if (typeof token.symbol !== 'string') {
          throw new Error('Token symbol should be a string, got: ' + typeof token.symbol);
        }
        if (typeof token.decimals !== 'number') {
          throw new Error('Token decimals should be a number, got: ' + typeof token.decimals);
        }
      }
      
      return true;
    },
    
    getValidTokenAddress: function(index) {
      return this.getValidToken(index).address;
    },
    
    getInvalidTokenAddress: function(index) {
      return this.getInvalidToken(index).address;
    },
    
    getValidTokenCount: function() {
      var tokenData = read('classpath:data/tokens/token-addresses.json');
      return tokenData.valid_tokens.length;
    },
    
    getInvalidTokenCount: function() {
      var tokenData = read('classpath:data/tokens/token-addresses.json');
      return tokenData.invalid_tokens.length;
    },
    
    getValidTokenByType: function(type) {
      var tokenData = read('classpath:data/tokens/token-addresses.json');
      for (var i = 0; i < tokenData.valid_tokens.length; i++) {
        if (tokenData.valid_tokens[i].type === type) {
          return tokenData.valid_tokens[i];
        }
      }
      throw new Error('Valid token with type not found: ' + type);
    },
    
    getInvalidTokenByType: function(type) {
      var tokenData = read('classpath:data/tokens/token-addresses.json');
      for (var i = 0; i < tokenData.invalid_tokens.length; i++) {
        if (tokenData.invalid_tokens[i].type === type) {
          return tokenData.invalid_tokens[i];
        }
      }
      throw new Error('Invalid token with type not found: ' + type);
    },
    
    // ===== HELPERS DE TRADING =====
    getOHLCVParams: function(index) {
      var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
      if (index >= ohlcvData.length) {
        throw new Error('OHLCV parameter index out of range: ' + index);
      }
      return ohlcvData[index];
    },
    
    getOHLCVInterval: function(index) {
      return this.getOHLCVParams(index).interval;
    },
    
    getOHLCVPriceFormat: function(index) {
      return this.getOHLCVParams(index).price_format;
    },
    
    getOHLCVChartFormat: function(index) {
      return this.getOHLCVParams(index).chart_format;
    },
    
    getOHLCVExpectedStatus: function(index) {
      return this.getOHLCVParams(index).expected_status;
    },
    
    getOHLCVParamsCount: function() {
      var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
      return ohlcvData.length;
    },
    
    getValidOHLCVParams: function(index) {
      var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
      var validParams = ohlcvData.filter(function(param) {
        return param.expected_status === 200;
      });
      if (index >= validParams.length) {
        throw new Error('Valid OHLCV parameter index out of range: ' + index);
      }
      return validParams[index];
    },
    
    getInvalidOHLCVParams: function(index) {
      var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
      var invalidParams = ohlcvData.filter(function(param) {
        return param.expected_status !== 200;
      });
      if (index >= invalidParams.length) {
        throw new Error('Invalid OHLCV parameter index out of range: ' + index);
      }
      return invalidParams[index];
    },
    
    getTradeAddress: function(index) {
      var tradeData = read('classpath:data/trading/trade-addresses.json');
      if (index >= tradeData.addresses.length) {
        throw new Error('Trade address index out of range: ' + index);
      }
      return tradeData.addresses[index];
    },
    
    getTradeAddressCount: function() {
      var tradeData = read('classpath:data/trading/trade-addresses.json');
      return tradeData.addresses.length;
    },
    
    // Funciones para parámetros de ordenamiento
    getSortParams: function(paramType, index) {
      var sortData = read('classpath:data/tokens/sort-params.json');
      if (sortData[paramType] === undefined) {
        throw new Error('Sort parameter type not found: ' + paramType);
      }
      if (index >= sortData[paramType].length) {
        throw new Error('Sort parameter index out of range: ' + index + ' for type: ' + paramType);
      }
      return sortData[paramType][index];
    },
    
    getValidSortBy: function(index) {
      return this.getSortParams('valid_sort_by', index);
    },
    
    getValidOrder: function(index) {
      return this.getSortParams('valid_order', index);
    },
    
    getInvalidSortBy: function(index) {
      return this.getSortParams('invalid_sort_by', index);
    },
    
    getInvalidOrder: function(index) {
      return this.getSortParams('invalid_order', index);
    },
    
    getValidSortByCount: function() {
      var sortData = read('classpath:data/tokens/sort-params.json');
      return sortData.valid_sort_by.length;
    },
    
    getValidOrderCount: function() {
      var sortData = read('classpath:data/tokens/sort-params.json');
      return sortData.valid_order.length;
    },
    
    // Funciones para parámetros de paginación
    getPaginationParams: function(paramType, index) {
      var paginationData = read('classpath:data/tokens/pagination-params.json');
      if (paginationData[paramType] === undefined) {
        throw new Error('Pagination parameter type not found: ' + paramType);
      }
      if (index >= paginationData[paramType].length) {
        throw new Error('Pagination parameter index out of range: ' + index + ' for type: ' + paramType);
      }
      return paginationData[paramType][index];
    },
    
    getValidPage: function(index) {
      return this.getPaginationParams('valid_pages', index);
    },
    
    getValidLimit: function(index) {
      return this.getPaginationParams('valid_limits', index);
    },
    
    getInvalidPage: function(index) {
      return this.getPaginationParams('invalid_pages', index);
    },
    
    getInvalidLimit: function(index) {
      return this.getPaginationParams('invalid_limits', index);
    },
    
    getValidPageCount: function() {
      var paginationData = read('classpath:data/tokens/pagination-params.json');
      return paginationData.valid_pages.length;
    },
    
    getValidLimitCount: function() {
      var paginationData = read('classpath:data/tokens/pagination-params.json');
      return paginationData.valid_limits.length;
    },
    
    // Funciones para parámetros de TokenPricesMulti
    getTokenPricesMultiParams: function(scenarioType) {
      var multiData = read('classpath:data/tokens/token-prices-multi-params.json');
      if (multiData.test_scenarios[scenarioType] === undefined) {
        throw new Error('TokenPricesMulti scenario type not found: ' + scenarioType);
      }
      return multiData.test_scenarios[scenarioType];
    },
    
    getTokenPricesMultiAddresses: function(scenarioType) {
      var params = this.getTokenPricesMultiParams(scenarioType);
      var tokenData = read('classpath:data/tokens/token-addresses.json');
      
      if (scenarioType === 'multiple_tokens') {
        return [tokenData.valid_tokens[0].address, tokenData.valid_tokens[1].address];
      } else if (scenarioType === 'single_token') {
        return [tokenData.valid_tokens[0].address];
      } else if (scenarioType === 'maximum_tokens') {
        var addresses = [];
        // Añadir 3 tokens válidos
        for (var i = 0; i < 3; i++) {
          addresses.push(tokenData.valid_tokens[i].address);
        }
        // Añadir 7 direcciones de prueba
        addresses = addresses.concat(params.test_addresses);
        return addresses;
      } else if (scenarioType === 'too_many_tokens') {
        var addresses = this.getTokenPricesMultiAddresses('maximum_tokens');
        addresses = addresses.concat(params.extra_addresses);
        return addresses;
      }
      
      throw new Error('Unsupported scenario type: ' + scenarioType);
    },
    
    getTokenPricesMultiValidationFields: function() {
      var multiData = read('classpath:data/tokens/token-prices-multi-params.json');
      return multiData.validation_fields;
    },
    
    validateTokenPricesMultiFields: function(responseData) {
      var requiredFields = this.getTokenPricesMultiValidationFields();
      
      for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (responseData[field] === undefined) {
          throw new Error('Required field missing: ' + field);
        }
      }
      
      return true;
    }
  };
}
