Feature: Resource Intensive Endpoints Performance Tests

  Background:
    * def performanceConfig = call read('classpath:helpers/performance-config.js')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS

  @performance @resource_intensive @token_holders
  Scenario: Resource intensive token holders endpoint - Large dataset
    * def endpoint = 'token_holders'
    * def scenario = scenarios.token_holders.complex_queries
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def tokenAddress = perfData.token_addresses.primary

    * url baseUrl + getEndpoint(endpoint) + tokenAddress
    And param page = 1
    And param limit = 1000
    When method get
    Then status 200
    * def time = responseTime
    * print 'Resource Intensive Token Holders - Response Time:', time, 'ms, Threshold:', threshold
    * assert time < threshold, 'Resource intensive token holders took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array' 