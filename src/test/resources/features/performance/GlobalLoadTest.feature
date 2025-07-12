Feature: Global Performance Load Tests

  Background:
    * def perfData = performanceConfig.TEST_DATA
    * def endpoints = perfData.endpoints

  @performance @global @load
  Scenario: Global load test across all endpoints
    * def addresses = perfData.token_addresses
    
    # Test token data endpoint
    * url baseUrl + getEndpoint(endpoints.token_data) + addresses.primary
    When method get
    Then status 200
    * def time = responseTime
    * print 'Token Data Response Time:', time, 'ms'
    * assert time < performanceConfig.getThreshold('SLOW')
    
    # Test token price endpoint
    * url baseUrl + getEndpoint(endpoints.token_price) + addresses.secondary
    When method get
    Then status 200
    * def time = responseTime
    * print 'Token Price Response Time:', time, 'ms'
    * assert time < performanceConfig.getThreshold('SLOW')
    
    # Test token list endpoint
    * url baseUrl + getEndpoint(endpoints.token_list)
    When method get
    Then status 200
    * def time = responseTime
    * print 'Token List Response Time:', time, 'ms'
    * assert time < performanceConfig.getThreshold('SLOW')

  @performance @global @stress
  Scenario: Global stress test across endpoints
    * def addresses = perfData.token_addresses
    * def stressThreshold = performanceConfig.getThreshold('TIMEOUT')
    
    # Test multiple endpoints under stress conditions
    * url baseUrl + getEndpoint(endpoints.token_data) + addresses.primary
    When method get
    Then status 200
    * def time = responseTime
    * print 'Stress Test - Token Data Response Time:', time, 'ms'
    * assert time < stressThreshold
    
    * url baseUrl + getEndpoint(endpoints.token_price) + addresses.tertiary
    When method get
    Then status 200
    * def time = responseTime
    * print 'Stress Test - Token Price Response Time:', time, 'ms'
    * assert time < stressThreshold

  @performance @global @endurance
  Scenario: Global endurance test
    * def addresses = perfData.token_addresses
    
    # Sustained load on multiple endpoints
    * url baseUrl + getEndpoint('token_data') + addresses.primary
    When method get
    Then status 200
    * def time = responseTime
    * print 'Endurance Test - Token Data Response Time:', time, 'ms'
    * assert time < performanceConfig.getThreshold('SLOW')
    
    * url baseUrl + getEndpoint('token_list')
    When method get
    Then status 200
    * def time = responseTime
    * print 'Endurance Test - Token List Response Time:', time, 'ms'
    * assert time < performanceConfig.getThreshold('SLOW')

  @boundary
  Scenario: Get token list with minimum page (1)
    And param page = 1
    And param limit = 10
    When method get
    Then status 200

  @boundary
  Scenario: Get token list with maximum limit (500)
    And param limit = 500
    When method get
    Then status 200

  @boundary
  Scenario: Get token list with minimum limit (10)
    And param limit = 10
    When method get
    Then status 200

  @edge
  Scenario: Get token list with all parameters at boundary values
    And param page = 1
    And param limit = 500
    And param sort_by = 'created_time'
    And param order = 'desc'
    When method get
    Then status 200

  @edge
  Scenario: Get token list with empty response (high page number)
    And param page = 1000
    And param limit = 10
    When method get
    Then status 200
    And match response.data == '#array' 