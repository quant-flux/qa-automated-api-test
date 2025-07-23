Feature: Critical Endpoints Performance Tests

  Background:
    * def performanceConfig = call read('classpath:helpers/performance-config.js')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS

  @performance @critical @token_price
  Scenario: Critical token price endpoint - Core functionality
    * def endpoint = 'token_price'
    * def scenario = scenarios.token_price.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def tokenAddress = perfData.token_addresses.primary

    * url baseUrl + getEndpoint(endpoint) + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Critical Token Price - Response Time:', time, 'ms, Threshold:', threshold
    * assert time < threshold, 'Critical token price endpoint took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#object'

  @performance @critical @token_data
  Scenario: Critical token data endpoint - Core functionality
    * def endpoint = 'token_data'
    * def scenario = scenarios.token_data.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def tokenAddress = perfData.token_addresses.primary

    * url baseUrl + getEndpoint(endpoint) + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Critical Token Data - Response Time:', time, 'ms, Threshold:', threshold
    * assert time < threshold, 'Critical token data endpoint took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#object' 