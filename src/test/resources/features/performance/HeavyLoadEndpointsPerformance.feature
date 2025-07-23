Feature: Heavy Load Endpoints Performance Tests

  Background:
    * def performanceConfig = call read('classpath:helpers/performance-config.js')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS

  @performance @heavy_load @token_prices_multi
  Scenario: Heavy load token prices multi - Maximum tokens processing
    * def endpoint = 'token_prices_multi'
    * def maxTokens = getTokenPriceMultiAddresses('maximum_tokens')
    * def threshold = 12000  # Umbral para carga pesada
    
    * url baseUrl + getEndpoint(endpoint)
    And param addresses = maxTokens
    When method get
    Then status 200
    * def time = responseTime
    * print 'Heavy Load Token Prices Multi (10 tokens) - Response Time:', time, 'ms'
    * assert time < threshold, 'Heavy load token prices multi took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @heavy_load @token_price_multi
  Scenario: Heavy load token price multi - Maximum tokens processing
    * def endpoint = 'token_price_multi'
    * def maxTokens = getTokenPriceMultiAddresses('maximum_tokens')
    * def threshold = 8000  # Umbral para carga pesada
    
    * url baseUrl + getEndpoint(endpoint)
    And param addresses = maxTokens
    When method get
    Then status 200
    * def time = responseTime
    * print 'Heavy Load Token Price Multi (10 tokens) - Response Time:', time, 'ms'
    * assert time < threshold, 'Heavy load token price multi took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @heavy_load @token_list_max
  Scenario: Heavy load token list - Maximum pagination
    * def endpoint = 'token_list'
    * def threshold = 15000  # Umbral para carga pesada
    
    * url baseUrl + getEndpoint(endpoint)
    And param page = 1
    And param limit = 500  # Límite máximo
    And param sort_by = 'volume_24h'
    And param order = 'desc'
    When method get
    Then status 200
    * def time = responseTime
    * print 'Heavy Load Token List (max pagination) - Response Time:', time, 'ms'
    * assert time < threshold, 'Heavy load token list took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data.elements == '#array'

  @performance @heavy_load @token_holders
  Scenario: Heavy load token holders - Large dataset processing
    * def endpoint = 'token_holders'
    * def tokenAddress = perfData.token_addresses.primary
    * def threshold = 12000  # Umbral para carga pesada
    
    * url baseUrl + getEndpoint(endpoint) + tokenAddress
    And param page = 1
    And param limit = 200  # Límite alto
    When method get
    Then status 200
    * def time = responseTime
    * print 'Heavy Load Token Holders - Response Time:', time, 'ms'
    * assert time < threshold, 'Heavy load token holders took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @heavy_load @token_new_listing
  Scenario: Heavy load token new listing - Large dataset processing
    * def endpoint = 'token_new_listing'
    * def threshold = 12000  # Umbral para carga pesada
    
    * url baseUrl + getEndpoint(endpoint)
    And param page = 1
    And param limit = 100  # Límite alto
    When method get
    Then status 200
    * def time = responseTime
    * print 'Heavy Load Token New Listing - Response Time:', time, 'ms'
    * assert time < threshold, 'Heavy load token new listing took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @heavy_load @concurrent_heavy
  Scenario: Concurrent heavy load endpoints - System stress test
    * def threshold = 20000  # Umbral para concurrencia de carga pesada
    
    # Test concurrent heavy load endpoints
    * url baseUrl + getEndpoint('token_prices_multi')
    And param addresses = getTokenPriceMultiAddresses('multiple_tokens')
    When method get
    Then status 200
    * def time1 = responseTime
    * print 'Concurrent Heavy 1 (Prices Multi) - Response Time:', time1, 'ms'
    
    * url baseUrl + getEndpoint('token_list')
    And param limit = 500
    When method get
    Then status 200
    * def time2 = responseTime
    * print 'Concurrent Heavy 2 (Token List Max) - Response Time:', time2, 'ms'
    
    * url baseUrl + getEndpoint('token_holders') + perfData.token_addresses.primary
    And param limit = 200
    When method get
    Then status 200
    * def time3 = responseTime
    * print 'Concurrent Heavy 3 (Token Holders) - Response Time:', time3, 'ms'
    
    # Validate all heavy load endpoints respond within threshold
    * assert time1 < threshold, 'Concurrent heavy prices multi failed: ' + time1 + 'ms'
    * assert time2 < threshold, 'Concurrent heavy token list failed: ' + time2 + 'ms'
    * assert time3 < threshold, 'Concurrent heavy token holders failed: ' + time3 + 'ms'

  @performance @heavy_load @data_volume
  Scenario: Data volume processing - Large datasets test
    * def threshold = 25000  # Umbral para volúmenes grandes de datos
    
    # Test with large data volumes
    * url baseUrl + getEndpoint('token_prices_multi')
    And param addresses = getTokenPriceMultiAddresses('maximum_tokens')
    And param time_range = '6m'  # Rango de tiempo largo
    And param interval = '1h'    # Intervalo pequeño = más datos
    When method get
    Then status 200
    * def time = responseTime
    * print 'Data Volume Test (Prices Multi 6m) - Response Time:', time, 'ms'
    * assert time < threshold, 'Data volume test took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @heavy_load @throughput
  Scenario: Throughput test - High request volume processing
    * def threshold = 18000  # Umbral para throughput alto
    * def tokenAddress = perfData.token_addresses.primary
    
    # Test high throughput scenarios
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time1 = responseTime
    * print 'Throughput Test 1 - Response Time:', time1, 'ms'
    
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time2 = responseTime
    * print 'Throughput Test 2 - Response Time:', time2, 'ms'
    
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time3 = responseTime
    * print 'Throughput Test 3 - Response Time:', time3, 'ms'
    
    # Validate throughput consistency
    * assert time1 < threshold, 'Throughput test 1 failed: ' + time1 + 'ms'
    * assert time2 < threshold, 'Throughput test 2 failed: ' + time2 + 'ms'
    * assert time3 < threshold, 'Throughput test 3 failed: ' + time3 + 'ms'
    
    # Check throughput degradation
    * def avgTime = (time1 + time2 + time3) / 3
    * def maxTime = Math.max(time1, time2, time3)
    * def throughputVariance = maxTime - avgTime
    * assert throughputVariance < 3000, 'Throughput variance ' + throughputVariance + 'ms indicates degradation' 