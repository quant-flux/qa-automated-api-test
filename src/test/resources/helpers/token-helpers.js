// Token Helpers Module
function getSortParams(type, index) {
  var sortData = {
    "valid_sort_by": ["created_time", "name", "symbol", "price", "volume_24h", "market_cap"],
    "invalid_sort_by": ["invalid_field", "non_existent", "wrong_column"],
    "valid_order": ["asc", "desc"],
    "invalid_order": ["invalid", "wrong", "random"]
  };
  return sortData[type][index];
}

function getPaginationParams(type, index) {
  var paginationData = {
    "valid_pages": [1, 2, 5, 10],
    "invalid_pages": [0, -1, "invalid", null],
    "valid_limits": [10, 25, 50, 100],
    "invalid_limits": [0, -1, 1001, "invalid"]
  };
  return paginationData[type][index];
}

function getValidToken(index) {
  var tokenData = {
    "valid_tokens": [
      {
        "address": "Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP",
        "name": "Test Token 1",
        "symbol": "TT1",
        "expected_decimals": 9
      },
      {
        "address": "CnGb7hJsGdsFyQP2uXNWrUgT5K1tovBA3mNnUZcTpump",
        "name": "Test Token 2", 
        "symbol": "TT2",
        "expected_decimals": 6
      },
      {
        "address": "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs",
        "name": "Test Token 3",
        "symbol": "TT3", 
        "expected_decimals": 9
      }
    ]
  };
  return tokenData.valid_tokens[index];
}

function getInvalidToken(index) {
  var tokenData = {
    "invalid_tokens": [
      {
        "address": "invalid_address_123",
        "expected_error": "Invalid token address"
      },
      {
        "address": "",
        "expected_error": "Token address is required"
      },
      {
        "address": "11111111111111111111111111111111",
        "expected_error": "Invalid token format"
      }
    ]
  };
  return tokenData.invalid_tokens[index];
}

// Export functions for use in karate-config.js
return {
  getSortParams: getSortParams,
  getPaginationParams: getPaginationParams,
  getValidToken: getValidToken,
  getInvalidToken: getInvalidToken
}; 