Feature: Trade List Performance Tests

  Background:
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS.trade_list

  @performance @baseline
  Scenario: Baseline performance test for trade list endpoint
    * def scenario = scenarios.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def expectedStatus = scenario.expected_status
    * def tokenAddress = perfData.token_addresses.primary
    
    * url baseUrl + getEndpoint('trade_list') + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#array'

  @performance @load @heavy
  Scenario: Heavy load test for trade list endpoint
    * def scenario = scenarios.heavy_load
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def tokenAddress = perfData.token_addresses.secondary
    
    * url baseUrl + getEndpoint('trade_list') + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#array'

  @performance @filtering
  Scenario: Performance test with filtering parameters
    * def scenario = scenarios.filtering
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def tokenAddress = perfData.token_addresses.tertiary
    
    * url baseUrl + getEndpoint('trade_list') + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#array' 