function getValidationHelpers() {
  return {
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
      if (!Array.isArray(responseArray)) {
        throw new Error('Response should be an array');
      }
      var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
      for (var i = 0; i < responseArray.length; i++) {
        var item = responseArray[i];
        for (var j = 0; j < unwantedFields.length; j++) {
          var field = unwantedFields[j];
          if (item[field] !== undefined) {
            throw new Error('Unwanted field found in item ' + i + ': ' + field);
          }
        }
      }
      return true;
    },

    validateTrendingTokensResponse: function(response, strictValidation) {
      if (!response || !response.data) {
        throw new Error('Invalid response structure');
      }
      
      if (!Array.isArray(response.data)) {
        throw new Error('Response data should be an array');
      }
      
      if (response.data.length === 0) {
        return true; // Empty array is valid
      }
      
      var requiredFields = ['address', 'name', 'symbol', 'price', 'volume_24h', 'percent_change_24h', 'created_time'];
      var optionalFields = ['market_cap', 'image'];
      
      for (var i = 0; i < response.data.length; i++) {
        var token = response.data[i];
        
        // Validate required fields
        for (var j = 0; j < requiredFields.length; j++) {
          var field = requiredFields[j];
          if (token[field] === undefined || token[field] === null) {
            throw new Error('Required field missing: ' + field + ' in token ' + i);
          }
        }
        
        // Validate field types and formats
        if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(token.address)) {
          throw new Error('Invalid address format in token ' + i);
        }
        
        if (typeof token.name !== 'string' || token.name.trim() === '') {
          throw new Error('Invalid name in token ' + i);
        }
        
        if (typeof token.symbol !== 'string' || token.symbol.trim() === '') {
          throw new Error('Invalid symbol in token ' + i);
        }
        
        if (typeof token.price !== 'number' || token.price < 0) {
          throw new Error('Invalid price in token ' + i);
        }
        
        if (typeof token.volume_24h !== 'number' || token.volume_24h < 0) {
          throw new Error('Invalid volume_24h in token ' + i);
        }
        
        if (typeof token.percent_change_24h !== 'number') {
          throw new Error('Invalid percent_change_24h in token ' + i);
        }
        
        if (typeof token.created_time !== 'number' || token.created_time.toString().length !== 10) {
          throw new Error('Invalid created_time in token ' + i);
        }
        
        // Validate optional fields if present
        if (token.market_cap !== undefined && token.market_cap !== null) {
          if (typeof token.market_cap !== 'number' || token.market_cap < 0) {
            throw new Error('Invalid market_cap in token ' + i);
          }
        }
        
        if (token.image !== undefined && token.image !== null && token.image !== '') {
          if (typeof token.image !== 'string' || !token.image.startsWith('https://static.cloud-service-app.com')) {
            throw new Error('Invalid image URL in token ' + i);
          }
        }
        
        // Strict validation for unwanted fields
        if (strictValidation) {
          var unwantedFields = ['_id', 'deleted', 'poolId', 'isAmm', 'isToken2022'];
          for (var k = 0; k < unwantedFields.length; k++) {
            var unwantedField = unwantedFields[k];
            if (token[unwantedField] !== undefined) {
              throw new Error('Unwanted field found: ' + unwantedField + ' in token ' + i);
            }
          }
        }
      }
      
      return true;
    },

    validateTrendingTokensSorting: function(tokens) {
      if (!Array.isArray(tokens) || tokens.length < 2) {
        return true; // No sorting validation needed for empty or single item arrays
      }
      
      for (var i = 1; i < tokens.length; i++) {
        if (tokens[i].volume_24h > tokens[i-1].volume_24h) {
          throw new Error('Tokens are not sorted by volume_24h in descending order at position ' + i);
        }
      }
      
      return true;
    },

    validateTrendingTokensLimit: function(tokens, expectedLimit) {
      if (expectedLimit === null || expectedLimit === undefined) {
        return true; // No limit validation needed
      }
      
      if (tokens.length > expectedLimit) {
        throw new Error('Token count (' + tokens.length + ') exceeds expected limit (' + expectedLimit + ')');
      }
      
      return true;
    },

    // Validaciones comunes para respuestas de API
    validateSuccessResponse: function(response) {
      if (!response || response.status !== 'success') {
        throw new Error('Response status should be "success"');
      }
      return true;
    },

    validateArrayResponse: function(response, maxLength) {
      if (!response || !response.data) {
        throw new Error('Invalid response structure');
      }
      
      if (!Array.isArray(response.data)) {
        throw new Error('Response data should be an array');
      }
      
      if (maxLength !== null && maxLength !== undefined) {
        if (response.data.length > maxLength) {
          throw new Error('Array length (' + response.data.length + ') exceeds maximum (' + maxLength + ')');
        }
      }
      
      return true;
    },

    validateArrayLengthRange: function(response, minLength, maxLength) {
      if (!response || !response.data) {
        throw new Error('Invalid response structure');
      }
      
      if (!Array.isArray(response.data)) {
        throw new Error('Response data should be an array');
      }
      
      if (minLength !== null && minLength !== undefined) {
        if (response.data.length < minLength) {
          throw new Error('Array length (' + response.data.length + ') is less than minimum (' + minLength + ')');
        }
      }
      
      if (maxLength !== null && maxLength !== undefined) {
        if (response.data.length > maxLength) {
          throw new Error('Array length (' + response.data.length + ') exceeds maximum (' + maxLength + ')');
        }
      }
      
      return true;
    },

    // Función combinada para validaciones comunes de trending tokens
    validateTrendingTokensBasic: function(response, expectedLimit) {
      this.validateSuccessResponse(response);
      this.validateArrayResponse(response, expectedLimit);
      return true;
    }
  };
} 