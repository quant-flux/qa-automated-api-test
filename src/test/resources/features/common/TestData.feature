Feature: Test Data Configuration
  # Este feature carga todos los datos de prueba desde archivos JSON
  # y los hace disponibles para otros features

  Background:
    # Cargar todos los archivos JSON de datos
    * def tokenAddresses = read('classpath:data/tokens/token-addresses.json')
    * def sortParams = read('classpath:data/tokens/sort-params.json')
    * def paginationParams = read('classpath:data/tokens/pagination-params.json')
    * def ohlcvParams = read('classpath:data/trading/ohlcv-params.json')
    * def tradeAddresses = read('classpath:data/trading/trade-addresses.json')
    
    # Crear funciones helper para acceder a los datos
    * def getValidToken = function(index) { return tokenAddresses.valid_tokens[index] }
    * def getInvalidToken = function(index) { return tokenAddresses.invalid_tokens[index] }
    * def getSortParam = function(type, index) { return sortParams[type][index] }
    * def getPaginationParam = function(type, index) { return paginationParams[type][index] }
    * def getOHLCVParam = function(index) { return ohlcvParams[index] }
    * def getTradeAddress = function(index) { return tradeAddresses.addresses[index] }

  Scenario: Load test data
    # Este scenario solo carga los datos, no hace nada más
    * print 'Test data loaded successfully' 