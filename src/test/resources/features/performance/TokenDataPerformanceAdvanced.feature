Feature: Token Data Advanced Performance Tests

  Background:
    * url baseUrl + getEndpoint('token_data')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS.token_data

  @performance @advanced
  Scenario: Advanced performance test using global config
    * def scenario = scenarios.baseline
    * def threshold = 5000
    * def testAddress = perfData.token_addresses.primary
    
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * assert time < threshold
    And match response.data.address == testAddress

  @performance @load @configured
  Scenario: Load test with configured settings
    * def loadSettings = performanceConfig.LOAD_CONFIGS.MEDIUM
    * def scenario = scenarios.load_medium
    * def threshold = 5000
    * def testAddress = perfData.token_addresses.secondary
    
    # * configure concurrent = loadSettings.concurrent  # No funciona en JUnit
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * assert time < threshold
    And match response.data == '#object'

  @performance @validation @advanced
  Scenario: Advanced validation with helper functions
    * def testAddress = perfData.token_addresses.tertiary
    * def validationRules = perfData.validation_rules
    
    * url baseUrl + getEndpoint('token_data') + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * assert time < 5000
    And match response.data == '#object'
    * def tokenData = response.data
    * match tokenData.address == '#string'
    * match tokenData.name == '#string'
    * match tokenData.symbol == '#string'

  @performance @stress @configured
  Scenario: Stress test with configured settings
    * def stressSettings = getStressConfig('MODERATE')
    # * configure concurrent = stressSettings.concurrent  # No funciona en JUnit
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(2)
    When method get
    Then status 200
    * def time = responseTime
    * assert time < getPerformanceThreshold('TIMEOUT')
    And match response.data.address == getValidTokenAddress(2)

  @performance @validation
  Scenario: Performance validation using helper functions
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(3)
    When method get
    Then status 200
    * def valid = validateResponseTime(response, getPerformanceThreshold('NORMAL'))
    * match valid == true
    And match response.data == '#object' 