function getTokenHelpers() {
  return {
    getValidToken: function(tokenAddresses, index) {
      if (index >= tokenAddresses.valid_tokens.length) {
        throw new Error('Valid token index out of range: ' + index);
      }
      return tokenAddresses.valid_tokens[index];
    },

    getInvalidToken: function(tokenAddresses, index) {
      if (index >= tokenAddresses.invalid_tokens.length) {
        throw new Error('Invalid token index out of range: ' + index);
      }
      return tokenAddresses.invalid_tokens[index];
    },

    getValidTokenAddress: function(tokenAddresses, index) {
      return this.getValidToken(tokenAddresses, index).address;
    },

    getInvalidTokenAddress: function(tokenAddresses, index) {
      return this.getInvalidToken(tokenAddresses, index).address;
    },

    getValidTokenCount: function(tokenAddresses) {
      return tokenAddresses.valid_tokens.length;
    },

    getInvalidTokenCount: function(tokenAddresses) {
      return tokenAddresses.invalid_tokens.length;
    }
  };
} 