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
    
    // Consolidated token validation function
    validateTokenDataComplete: function(data, validationLevel) {
      var errors = [];
      
      // Level 1: Basic validation (existing validateBasicTokenFields)
      if (validationLevel === 'basic' || validationLevel === 'strict') {
        var basicFields = ['address', 'name', 'symbol'];
        for (var i = 0; i < basicFields.length; i++) {
          var field = basicFields[i];
          if (data[field] === undefined) {
            errors.push('Required field missing: ' + field);
          }
        }
      }
      
      // Level 2: Extended validation (existing validateTokenDataFields)
      if (validationLevel === 'extended' || validationLevel === 'strict') {
        var extendedFields = ['decimals', 'creator', 'create_tx', 'created_time', 'supply'];
        for (var i = 0; i < extendedFields.length; i++) {
          var field = extendedFields[i];
          if (data[field] === undefined) {
            errors.push('Required field missing: ' + field);
          }
        }
      }
      
      // Level 3: Strict validation (new constraints)
      if (validationLevel === 'strict') {
        // Required fields with format validation
        if (!data.address || !this.isValidBase58(data.address, 32, 44)) {
          errors.push("address must be base58 string with 32-44 characters, not empty");
        }
        
        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
          errors.push("name must be non-empty string");
        }
        
        if (!data.symbol || typeof data.symbol !== 'string' || data.symbol.trim() === '') {
          errors.push("symbol must be non-empty string");
        }
        
        if (!data.creator || !this.isValidBase58(data.creator, 32, 44)) {
          errors.push("creator must be base58 string with 32-44 characters, not empty");
        }
        
        if (!data.create_tx || !this.isValidBase58(data.create_tx, 88, 88)) {
          errors.push("create_tx must be base58 string with exactly 88 characters, not empty");
        }
        
        if (!data.created_time || !this.isValidInteger(data.created_time, 10)) {
          errors.push("created_time must be integer with 10 digits");
        }
        
        // Optional fields validation
        if (data.image && data.image !== '') {
          if (!data.image.startsWith('https://static.cloud-service-app.com')) {
            errors.push("image URL must be from https://static.cloud-service-app.com");
          }
        }
        
        if (data.decimals !== undefined && ![6, 9].includes(data.decimals)) {
          errors.push("decimals should typically be 6 or 9");
        }
        
        if (data.supply !== undefined && data.supply > 1000000000) {
          errors.push("supply should be less than or equal to 1,000,000,000");
        }
        
        if (data.created_on && !['pumpfun', 'moonshot', 'boop', 'raydium_launchpad', 'bonk', 'dynamic_bonding_curve', 'unknown'].includes(data.created_on)) {
          errors.push("created_on must be one of: pumpfun, moonshot, boop, raydium_launchpad, bonk, dynamic_bonding_curve, unknown");
        }
        
        if (data.metadata_uri && data.metadata_uri !== '') {
          if (data.metadata_uri.includes('/ipfs/') && !data.metadata_uri.startsWith('https://ipfs.io/ipfs/')) {
            errors.push("metadata_uri with /ipfs/ must start with https://ipfs.io/ipfs/");
          }
        }
        
        if (data.mint_authority !== null && data.mint_authority !== undefined) {
          if (!this.isValidBase58(data.mint_authority, 32, 44)) {
            errors.push("mint_authority must be null or base58 string with 32-44 characters");
          }
        }
        
        if (data.freeze_authority !== null && data.freeze_authority !== undefined) {
          if (!this.isValidBase58(data.freeze_authority, 32, 44)) {
            errors.push("freeze_authority must be null or base58 string with 32-44 characters");
          }
        }
        
        if (data.bonding_curve !== undefined && data.bonding_curve !== null) {
          if (!this.isValidBase58(data.bonding_curve, 32, 44)) {
            errors.push("bonding_curve must be base58 string with 32-44 characters or not exist");
          }
        }
        
        if (data.associated_bonding_curve !== undefined && data.associated_bonding_curve !== null) {
          if (!this.isValidBase58(data.associated_bonding_curve, 32, 44)) {
            errors.push("associated_bonding_curve must be base58 string with 32-44 characters or not exist");
          }
        }
        
        // Metadata validation
        if (data.metadata) {
          var metadataErrors = this.validateMetadataConstraints(data.metadata, data);
          for (var i = 0; i < metadataErrors.length; i++) {
            errors.push(metadataErrors[i]);
          }
        }
      }
      
      if (errors.length > 0) {
        throw new Error("Token data validation failed: " + errors.join("; "));
      }
      
      return true;
    },
    
    validateMetadataConstraints: function(metadata, parentData) {
      var errors = [];
      
      if (metadata.name !== parentData.name) {
        errors.push("metadata.name must match parent name");
      }
      
      if (metadata.symbol !== parentData.symbol) {
        errors.push("metadata.symbol must match parent symbol");
      }
      
      if (metadata.image && metadata.image !== '') {
        if (metadata.image.includes('/ipfs/') && !metadata.image.startsWith('https://ipfs.io/ipfs/')) {
          errors.push("metadata.image with /ipfs/ must start with https://ipfs.io/ipfs/");
        }
      }
      
      // Optional fields should not exist if empty
      var optionalFields = ['description', 'twitter', 'website', 'telegram', 'uri'];
      for (var i = 0; i < optionalFields.length; i++) {
        var field = optionalFields[i];
        if (metadata[field] !== undefined && metadata[field] === '') {
          errors.push("metadata." + field + " should not exist if empty");
        }
      }
      
      return errors;
    },
    
    isValidBase58: function(str, minLength, maxLength) {
      if (typeof str !== 'string') return false;
      if (str.length < minLength || str.length > maxLength) return false;
      
      // Base58 characters: 1-9, A-H, J-N, P-Z, a-k, m-z (excluding 0, O, I, l)
      var base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
      return base58Regex.test(str);
    },
    
    isValidInteger: function(num, expectedLength) {
      if (!Number.isInteger(num)) return false;
      return num.toString().length === expectedLength;
    },
    
    // Keep existing functions for backward compatibility but mark as deprecated
    validateBasicTokenFields: function(responseData) {
        console.warn('validateBasicTokenFields is deprecated. Use validateTokenDataComplete(data, "basic") instead.');
        return this.validateTokenDataComplete(responseData, 'basic');
    },
    
    validateTokenDataFields: function(responseData) {
        console.warn('validateTokenDataFields is deprecated. Use validateTokenDataComplete(data, "extended") instead.');
        return this.validateTokenDataComplete(responseData, 'extended');
    },
    
    // Alias for the new strict validation
    validateTokenDataConstraints: function(data) {
        return this.validateTokenDataComplete(data, 'strict');
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
