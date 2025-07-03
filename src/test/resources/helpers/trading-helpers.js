function getTradingHelpers() {
  return {
    getOHLCVParams: function(ohlcvParams, index) {
      if (index >= ohlcvParams.length) {
        throw new Error('OHLCV parameter index out of range: ' + index);
      }
      return ohlcvParams[index];
    },

    getOHLCVInterval: function(ohlcvParams, index) {
      return this.getOHLCVParams(ohlcvParams, index).interval;
    },

    getOHLCVPriceFormat: function(ohlcvParams, index) {
      return this.getOHLCVParams(ohlcvParams, index).price_format;
    },

    getOHLCVChartFormat: function(ohlcvParams, index) {
      return this.getOHLCVParams(ohlcvParams, index).chart_format;
    },

    getOHLCVExpectedStatus: function(ohlcvParams, index) {
      return this.getOHLCVParams(ohlcvParams, index).expected_status;
    }
  };
} 