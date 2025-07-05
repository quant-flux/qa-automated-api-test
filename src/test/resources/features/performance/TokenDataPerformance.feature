Feature: Token Data Performance Tests

  Background:
    * url baseUrl + getEndpoint('token_data')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS.token_data

  @performance @baseline
  Scenario: Baseline performance test for token data endpoint
    * def scenario = scenarios.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def testAddress = perfData.token_addresses.primary
    * def expectedStatus = scenario.expected_status
    
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    And match responseStatus == expectedStatus
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data.address == testAddress

  @performance @load @light
  Scenario: Light load test for token data endpoint
    * def scenario = scenarios.load_light
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def testAddress = perfData.token_addresses.secondary
    * def expectedStatus = scenario.expected_status
    
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    And match responseStatus == expectedStatus
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#object'

  @performance @load @medium
  Scenario: Medium load test for token data endpoint
    * def scenario = scenarios.load_medium
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def testAddress = perfData.token_addresses.tertiary
    * def expectedStatus = scenario.expected_status
    
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    And match responseStatus == expectedStatus
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#object'

  @performance @stress
  Scenario: Stress test for token data endpoint
    * def scenario = scenarios.stress
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def testAddress = perfData.token_addresses.primary
    * def expectedStatus = scenario.expected_status
    
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    And match responseStatus == expectedStatus
    * def time = responseTime
    * print 'Tiempo de respuesta:', time, 'Threshold:', threshold
    * assert time < threshold
    And match response.data == '#object'

  @performance @endurance
  Scenario: Endurance test for token data endpoint
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(3)
    When method get
    Then status 200
    * def time = responseTime
    * assert time < 2000
    And match response.data.address == getValidTokenAddress(3)

  @performance @mixed
  Scenario: Mixed token addresses performance test
    * def addresses = []
    * eval for (var i = 0; i < 3; i++) { addresses.push(getValidTokenAddress(i)); }
    * url baseUrl + getEndpoint('token_data') + addresses[0]
    When method get
    Then status 200
    * def time = responseTime
    * assert time < 1500
    And match response.data.address == addresses[0]

@performance @global
Scenario: Performance test all endpoints
  # Testea todos los endpoints en secuencia
  # Con diferentes thresholds según el endpoint 