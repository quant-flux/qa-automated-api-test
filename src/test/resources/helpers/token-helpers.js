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
    },

    getTrendingScenario: function(trendingParams, scenarioName) {
      if (!trendingParams.test_scenarios[scenarioName]) {
        throw new Error('Trending scenario not found: ' + scenarioName);
      }
      return trendingParams.test_scenarios[scenarioName];
    },

    getValidTrendingLimit: function(trendingParams, index) {
      if (index >= trendingParams.valid_limits.length) {
        throw new Error('Valid trending limit index out of range: ' + index);
      }
      return trendingParams.valid_limits[index];
    },

    getInvalidTrendingLimit: function(trendingParams, index) {
      if (index >= trendingParams.invalid_limits.length) {
        throw new Error('Invalid trending limit index out of range: ' + index);
      }
      return trendingParams.invalid_limits[index];
    },

    getValidTrendingPeriod: function(trendingParams, index) {
      if (index >= trendingParams.valid_periods.length) {
        throw new Error('Valid trending period index out of range: ' + index);
      }
      return trendingParams.valid_periods[index];
    },

    getValidTrendingMinutes: function(trendingParams, index) {
      if (index >= trendingParams.valid_minutes.length) {
        throw new Error('Valid trending minutes index out of range: ' + index);
      }
      return trendingParams.valid_minutes[index];
    },

    getInvalidTrendingMinutes: function(trendingParams, index) {
      if (index >= trendingParams.invalid_minutes.length) {
        throw new Error('Invalid trending minutes index out of range: ' + index);
      }
      return trendingParams.invalid_minutes[index];
    },

    getValidTrendingOrder: function(trendingParams, index) {
      if (index >= trendingParams.valid_orders.length) {
        throw new Error('Valid trending order index out of range: ' + index);
      }
      return trendingParams.valid_orders[index];
    },

    getInvalidTrendingOrder: function(trendingParams, index) {
      if (index >= trendingParams.invalid_orders.length) {
        throw new Error('Invalid trending order index out of range: ' + index);
      }
      return trendingParams.invalid_orders[index];
    },

    getValidTrendingOrderField: function(trendingParams, index) {
      if (index >= trendingParams.valid_order_fields.length) {
        throw new Error('Valid trending order field index out of range: ' + index);
      }
      return trendingParams.valid_order_fields[index];
    },

    getInvalidTrendingOrderField: function(trendingParams, index) {
      if (index >= trendingParams.invalid_order_fields.length) {
        throw new Error('Invalid trending order field index out of range: ' + index);
      }
      return trendingParams.invalid_order_fields[index];
    }
  };
} 