// Trading Helpers Module
function getOHLCVParams(index) {
  var ohlcvData = [
    {"interval": "1h", "price_format": "USD", "chart_format": "price", "expected_status": 200},
    {"interval": "5m", "price_format": "USD", "chart_format": "price", "expected_status": 200},
    {"interval": "15m", "price_format": "USD", "chart_format": "price", "expected_status": 200},
    {"interval": "30m", "price_format": "USD", "chart_format": "price", "expected_status": 200},
    {"interval": "1h", "price_format": "USD", "chart_format": "volume", "expected_status": 200},
    {"interval": "1h", "price_format": "USD", "chart_format": "market_cap", "expected_status": 200},
    {"interval": "1h", "price_format": "SOL", "chart_format": "price", "expected_status": 200},
    {"interval": "5m", "price_format": "SOL", "chart_format": "price", "expected_status": 200},
    {"interval": "invalid_interval", "price_format": "USD", "chart_format": "price", "expected_status": 400},
    {"interval": "1h", "price_format": "invalid_format", "chart_format": "price", "expected_status": 400},
    {"interval": "1h", "price_format": "USD", "chart_format": "invalid_chart", "expected_status": 400}
  ];
  return ohlcvData[index];
}

function getTradeAddress(index) {
  var tradeData = {
    "addresses": [
      "Hm6u8PKTyR5hPFHzhpVbGsbSWPpHDaEg6dhpyKdyPUMP",
      "CnGb7hJsGdsFyQP2uXNWrUgT5K1tovBA3mNnUZcTpump",
      "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs"
    ]
  };
  return tradeData.addresses[index];
}

// Export functions for use in karate-config.js
return {
  getOHLCVParams: getOHLCVParams,
  getTradeAddress: getTradeAddress
}; 