Feature: Bottleneck Endpoints Performance Tests

  Background:
    * def performanceConfig = call read('classpath:helpers/performance-config.js')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS

  @performance @bottleneck @trade_ohlcv
  Scenario: Bottleneck trade OHLCV endpoint - Large dataset bottleneck
    * def endpoint = 'trade_ohlcv'
    * def scenario = scenarios.trade_ohlcv.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    * def tokenAddress = perfData.token_addresses.primary
    
    * url baseUrl + getEndpoint(endpoint) + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Bottleneck Trade OHLCV - Response Time:', time, 'ms, Threshold:', threshold
    * assert time < threshold, 'Bottleneck trade OHLCV took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @bottleneck @token_trending
  Scenario: Bottleneck token trending endpoint - Complex calculations
    * def endpoint = 'token_trending'
    * def scenario = scenarios.token_trending.baseline
    * def threshold = performanceConfig.getThreshold(scenario.threshold)
    
    * url baseUrl + getEndpoint(endpoint)
    When method get
    Then status 200
    * def time = responseTime
    * print 'Bottleneck Token Trending - Response Time:', time, 'ms, Threshold:', threshold
    * assert time < threshold, 'Bottleneck token trending took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array' 