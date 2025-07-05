Feature: Token List Performance Tests

  Background:
    * url baseUrl + getEndpoint('token_list')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS.token_list

  @performance @baseline
  Scenario: Baseline performance test for token list endpoint
    * def scenario = scenarios.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def expectedStatus = scenario.expected_status
    
    * url baseUrl + getEndpoint('token_list')
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data.elements == '#array'

  @performance @load @medium
  Scenario: Medium load test for token list endpoint
    * def scenario = scenarios.medium_load
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    
    * url baseUrl + getEndpoint('token_list')
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data.elements == '#array'

  @performance @pagination
  Scenario: Performance test with pagination parameters
    * def scenario = scenarios.pagination
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def paginationParams = perfData.pagination_params
    
    * url baseUrl + getEndpoint('token_list') + '?limit=' + paginationParams.limit + '&page=' + paginationParams.page
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data.elements == '#array' 