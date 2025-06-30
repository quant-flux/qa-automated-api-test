// Token Helpers Module
function getSortParams(paramType, index) {
  var sortData = read('classpath:data/tokens/sort-params.json');
  if (sortData[paramType] === undefined) {
    throw new Error('Sort parameter type not found: ' + paramType);
  }
  if (index >= sortData[paramType].length) {
    throw new Error('Sort parameter index out of range: ' + index + ' for type: ' + paramType);
  }
  return sortData[paramType][index];
}

function getValidSortBy(index) {
  return getSortParams('valid_sort_by', index);
}

function getValidOrder(index) {
  return getSortParams('valid_order', index);
}

function getInvalidSortBy(index) {
  return getSortParams('invalid_sort_by', index);
}

function getInvalidOrder(index) {
  return getSortParams('invalid_order', index);
}

function getValidSortByCount() {
  var sortData = read('classpath:data/tokens/sort-params.json');
  return sortData.valid_sort_by.length;
}

function getValidOrderCount() {
  var sortData = read('classpath:data/tokens/sort-params.json');
  return sortData.valid_order.length;
}

function getPaginationParams(paramType, index) {
  var paginationData = read('classpath:data/tokens/pagination-params.json');
  if (paginationData[paramType] === undefined) {
    throw new Error('Pagination parameter type not found: ' + paramType);
  }
  if (index >= paginationData[paramType].length) {
    throw new Error('Pagination parameter index out of range: ' + index + ' for type: ' + paramType);
  }
  return paginationData[paramType][index];
}

function getValidPage(index) {
  return getPaginationParams('valid_pages', index);
}

function getValidLimit(index) {
  return getPaginationParams('valid_limits', index);
}

function getInvalidPage(index) {
  return getPaginationParams('invalid_pages', index);
}

function getInvalidLimit(index) {
  return getPaginationParams('invalid_limits', index);
}

function getValidPageCount() {
  var paginationData = read('classpath:data/tokens/pagination-params.json');
  return paginationData.valid_pages.length;
}

function getValidLimitCount() {
  var paginationData = read('classpath:data/tokens/pagination-params.json');
  return paginationData.valid_limits.length;
}

function getValidToken(index) {
  var tokenData = read('classpath:data/tokens/token-addresses.json');
  if (index >= tokenData.valid_tokens.length) {
    throw new Error('Valid token index out of range: ' + index);
  }
  return tokenData.valid_tokens[index];
}

function getInvalidToken(index) {
  var tokenData = read('classpath:data/tokens/token-addresses.json');
  if (index >= tokenData.invalid_tokens.length) {
    throw new Error('Invalid token index out of range: ' + index);
  }
  return tokenData.invalid_tokens[index];
}

function getValidTokenAddress(index) {
  return getValidToken(index).address;
}

function getInvalidTokenAddress(index) {
  return getInvalidToken(index).address;
}

function getValidTokenCount() {
  var tokenData = read('classpath:data/tokens/token-addresses.json');
  return tokenData.valid_tokens.length;
}

function getInvalidTokenCount() {
  var tokenData = read('classpath:data/tokens/token-addresses.json');
  return tokenData.invalid_tokens.length;
}

function getValidTokenByType(type) {
  var tokenData = read('classpath:data/tokens/token-addresses.json');
  for (var i = 0; i < tokenData.valid_tokens.length; i++) {
    if (tokenData.valid_tokens[i].type === type) {
      return tokenData.valid_tokens[i];
    }
  }
  throw new Error('Valid token with type not found: ' + type);
}

function getInvalidTokenByType(type) {
  var tokenData = read('classpath:data/tokens/token-addresses.json');
  for (var i = 0; i < tokenData.invalid_tokens.length; i++) {
    if (tokenData.invalid_tokens[i].type === type) {
      return tokenData.invalid_tokens[i];
    }
  }
  throw new Error('Invalid token with type not found: ' + type);
}

function validateNoUnwantedFields(responseData) {
  var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
  
  for (var i = 0; i < unwantedFields.length; i++) {
    var field = unwantedFields[i];
    if (responseData[field] !== undefined) {
      throw new Error('Unwanted field found: ' + field);
    }
  }
  return true;
}

function validateNoUnwantedFieldsInArray(responseArray) {
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
}

function validatePriceVariationsFields(responseData) {
  var requiredFields = [
    'address',
    'price',
    'price_5m',
    'percent_5m', 
    'volume_5m',
    'price_30m',
    'percent_30m',
    'volume_30m',
    'price_1h',
    'percent_1h',
    'volume_1h',
    'price_6h',
    'percent_6h',
    'volume_6h',
    'price_24h',
    'percent_24h',
    'volume_24h'
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
}

function validateBasicTokenFields(responseData) {
  console.warn('validateBasicTokenFields is deprecated. Use validateTokenDataComplete(data, "basic") instead.');
  return validateTokenDataComplete(responseData, 'basic');
}

function validateTokenDataFields(responseData) {
  console.warn('validateTokenDataFields is deprecated. Use validateTokenDataComplete(data, "extended") instead.');
  return validateTokenDataComplete(responseData, 'extended');
}

function validateTokenDataComplete(data, validationLevel = 'strict') {
    const errors = [];
    
    // Level 1: Basic validation (existing validateBasicTokenFields)
    if (validationLevel === 'basic' || validationLevel === 'strict') {
        const basicFields = ['address', 'name', 'symbol'];
        basicFields.forEach(field => {
            if (data[field] === undefined) {
                errors.push(`Required field missing: ${field}`);
            }
        });
    }
    
    // Level 2: Extended validation (existing validateTokenDataFields)
    if (validationLevel === 'extended' || validationLevel === 'strict') {
        const extendedFields = ['decimals', 'creator', 'create_tx', 'created_time', 'supply'];
        extendedFields.forEach(field => {
            if (data[field] === undefined) {
                errors.push(`Required field missing: ${field}`);
            }
        });
    }
    
    // Level 3: Strict validation (new constraints)
    if (validationLevel === 'strict') {
        // Required fields with format validation
        if (!data.address || !isValidBase58(data.address, 32, 44)) {
            errors.push("address must be base58 string with 32-44 characters, not empty");
        }
        
        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
            errors.push("name must be non-empty string");
        }
        
        if (!data.symbol || typeof data.symbol !== 'string' || data.symbol.trim() === '') {
            errors.push("symbol must be non-empty string");
        }
        
        if (!data.creator || !isValidBase58(data.creator, 32, 44)) {
            errors.push("creator must be base58 string with 32-44 characters, not empty");
        }
        
        if (!data.create_tx || !isValidBase58(data.create_tx, 88, 88)) {
            errors.push("create_tx must be base58 string with exactly 88 characters, not empty");
        }
        
        if (!data.created_time || !isValidInteger(data.created_time, 10)) {
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
            if (!isValidBase58(data.mint_authority, 32, 44)) {
                errors.push("mint_authority must be null or base58 string with 32-44 characters");
            }
        }
        
        if (data.freeze_authority !== null && data.freeze_authority !== undefined) {
            if (!isValidBase58(data.freeze_authority, 32, 44)) {
                errors.push("freeze_authority must be null or base58 string with 32-44 characters");
            }
        }
        
        if (data.bonding_curve !== undefined && data.bonding_curve !== null) {
            if (!isValidBase58(data.bonding_curve, 32, 44)) {
                errors.push("bonding_curve must be base58 string with 32-44 characters or not exist");
            }
        }
        
        if (data.associated_bonding_curve !== undefined && data.associated_bonding_curve !== null) {
            if (!isValidBase58(data.associated_bonding_curve, 32, 44)) {
                errors.push("associated_bonding_curve must be base58 string with 32-44 characters or not exist");
            }
        }
        
        // Metadata validation
        if (data.metadata) {
            const metadataErrors = validateMetadataConstraints(data.metadata, data);
            errors.push(...metadataErrors);
        }
    }
    
    if (errors.length > 0) {
        throw new Error("Token data validation failed: " + errors.join("; "));
    }
    
    return true;
}

function validateMetadataConstraints(metadata, parentData) {
    const errors = [];
    
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
    const optionalFields = ['description', 'twitter', 'website', 'telegram', 'uri'];
    optionalFields.forEach(field => {
        if (metadata[field] !== undefined && metadata[field] === '') {
            errors.push(`metadata.${field} should not exist if empty`);
        }
    });
    
    return errors;
}

function isValidBase58(str, minLength, maxLength) {
    if (typeof str !== 'string') return false;
    if (str.length < minLength || str.length > maxLength) return false;
    
    // Base58 characters: 1-9, A-H, J-N, P-Z, a-k, m-z (excluding 0, O, I, l)
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]+$/;
    return base58Regex.test(str);
}

function isValidInteger(num, expectedLength) {
    if (!Number.isInteger(num)) return false;
    return num.toString().length === expectedLength;
}

function validateMarketFields(responseData) {
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
}

function validateTokenListElements(tokenArray) {
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
}

function getOHLCVParamsCount() {
  var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
  return ohlcvData.length;
}

// Funciones para parámetros de TokenPricesMulti
function getTokenPricesMultiParams(scenarioType) {
  var multiData = read('classpath:data/tokens/token-prices-multi-params.json');
  if (multiData.test_scenarios[scenarioType] === undefined) {
    throw new Error('TokenPricesMulti scenario type not found: ' + scenarioType);
  }
  return multiData.test_scenarios[scenarioType];
}

function getTokenPricesMultiAddresses(scenarioType) {
  var params = getTokenPricesMultiParams(scenarioType);
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
    var addresses = getTokenPricesMultiAddresses('maximum_tokens');
    addresses = addresses.concat(params.extra_addresses);
    return addresses;
  }
  
  throw new Error('Unsupported scenario type: ' + scenarioType);
}

function getTokenPricesMultiValidationFields() {
  var multiData = read('classpath:data/tokens/token-prices-multi-params.json');
  return multiData.validation_fields;
}

function validateTokenPricesMultiFields(responseData) {
  var requiredFields = getTokenPricesMultiValidationFields();
  
  for (var i = 0; i < requiredFields.length; i++) {
    var field = requiredFields[i];
    if (responseData[field] === undefined) {
      throw new Error('Required field missing: ' + field);
    }
  }
  
  return true;
}

// Status Codes Helpers
function getStatusCode(category, type) {
  var statusData = read('classpath:data/api/status-codes.json');
  if (statusData[category] === undefined) {
    throw new Error('Status code category not found: ' + category);
  }
  if (statusData[category][type] === undefined) {
    throw new Error('Status code type not found: ' + type + ' in category: ' + category);
  }
  return statusData[category][type];
}

function getSuccessCode(type) {
  return getStatusCode('success', type);
}

function getClientErrorCode(type) {
  return getStatusCode('client_error', type);
}

function getServerErrorCode(type) {
  return getStatusCode('server_error', type);
}

// Common Strings Helpers
function getCommonString(category, type) {
  var commonData = read('classpath:data/api/common-strings.json');
  if (commonData[category] === undefined) {
    throw new Error('Common string category not found: ' + category);
  }
  if (commonData[category][type] === undefined) {
    throw new Error('Common string type not found: ' + type + ' in category: ' + category);
  }
  return commonData[category][type];
}

function getStatusString(type) {
  return getCommonString('status', type);
}

function getMessageString(type) {
  return getCommonString('messages', type);
}

function getFormatString(type) {
  return getCommonString('formats', type);
}

function getIntervalString(type) {
  return getCommonString('intervals', type);
}

function getChartFormatString(type) {
  return getCommonString('chart_formats', type);
}

function getPriceFormatString(type) {
  return getCommonString('price_formats', type);
}

// Alias for the new strict validation
function validateTokenDataConstraints(data) {
    return validateTokenDataComplete(data, 'strict');
}

// Export functions for use in karate-config.js
return {
  getSortParams: getSortParams,
  getPaginationParams: getPaginationParams,
  getValidToken: getValidToken,
  getInvalidToken: getInvalidToken,
  validateNoUnwantedFields: validateNoUnwantedFields,
  validateNoUnwantedFieldsInArray: validateNoUnwantedFieldsInArray,
  validatePriceVariationsFields: validatePriceVariationsFields,
  validateMarketFields: validateMarketFields,
  validateTokenListElements: validateTokenListElements
}; 