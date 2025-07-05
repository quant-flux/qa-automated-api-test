Feature: Token Price Performance Tests

  Background:
    * url baseUrl + getEndpoint('token_price')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS.token_price

  @performance @baseline
  Scenario: Baseline performance test for token price endpoint
    * def scenario = scenarios.baseline
    * def threshold = 5000
    * def testAddress = perfData.token_addresses.primary
    
    * url baseUrl + getEndpoint('token_price') + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#object'

  @performance @load @light
  Scenario: Light load test for token price endpoint
    * def scenario = scenarios.light_load
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def testAddress = perfData.token_addresses.secondary
    
    * url baseUrl + getEndpoint('token_price') + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data.price == '#number'

  @performance @stress
  Scenario: Stress test for token price endpoint
    * def scenario = scenarios.stress
    * def threshold = 5000
    * def testAddress = perfData.token_addresses.tertiary
    
    * url baseUrl + getEndpoint('token_price') + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#object' 