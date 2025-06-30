// Trading Helpers Module

// Funciones para parámetros OHLCV
function getOHLCVParams(index) {
  var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
  if (index >= ohlcvData.length) {
    throw new Error('OHLCV parameter index out of range: ' + index);
  }
  return ohlcvData[index];
}

function getOHLCVInterval(index) {
  return getOHLCVParams(index).interval;
}

function getOHLCVPriceFormat(index) {
  return getOHLCVParams(index).price_format;
}

function getOHLCVChartFormat(index) {
  return getOHLCVParams(index).chart_format;
}

function getOHLCVExpectedStatus(index) {
  return getOHLCVParams(index).expected_status;
}

function getOHLCVParamsCount() {
  var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
  return ohlcvData.length;
}

function getValidOHLCVParams(index) {
  var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
  var validParams = ohlcvData.filter(function(param) {
    return param.expected_status === 200;
  });
  if (index >= validParams.length) {
    throw new Error('Valid OHLCV parameter index out of range: ' + index);
  }
  return validParams[index];
}

function getInvalidOHLCVParams(index) {
  var ohlcvData = read('classpath:data/trading/ohlcv-params.json');
  var invalidParams = ohlcvData.filter(function(param) {
    return param.expected_status !== 200;
  });
  if (index >= invalidParams.length) {
    throw new Error('Invalid OHLCV parameter index out of range: ' + index);
  }
  return invalidParams[index];
}

// Funciones para direcciones de trading
function getTradeAddress(index) {
  var tradeData = read('classpath:data/trading/trade-addresses.json');
  if (index >= tradeData.addresses.length) {
    throw new Error('Trade address index out of range: ' + index);
  }
  return tradeData.addresses[index];
}

function getTradeAddressCount() {
  var tradeData = read('classpath:data/trading/trade-addresses.json');
  return tradeData.addresses.length;
}

// Export functions for use in karate-config.js
return {
  getOHLCVParams: getOHLCVParams,
  getOHLCVInterval: getOHLCVInterval,
  getOHLCVPriceFormat: getOHLCVPriceFormat,
  getOHLCVChartFormat: getOHLCVChartFormat,
  getOHLCVExpectedStatus: getOHLCVExpectedStatus,
  getOHLCVParamsCount: getOHLCVParamsCount,
  getValidOHLCVParams: getValidOHLCVParams,
  getInvalidOHLCVParams: getInvalidOHLCVParams,
  getTradeAddress: getTradeAddress,
  getTradeAddressCount: getTradeAddressCount
}; 