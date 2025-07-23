@performance
Feature: Trade OHLCV Performance Tests

  Background:
    * def ohlcvData = read('classpath:data/performance/trade-ohlcv.json')
    * url baseUrl + '/trade/ohlcv'

  @baseline
  Scenario: Baseline performance test for OHLCV endpoint
    Given request ohlcvData.baseline
    When method GET
    Then status 200

  @load
  Scenario: Load test for OHLCV endpoint
    Given request ohlcvData.load
    When method GET
    Then status 200

  @stress
  Scenario: Stress test for OHLCV endpoint
    Given request ohlcvData.stress
    When method GET
    Then status 200

  @latency
  Scenario: Latency test for OHLCV endpoint
    Given request ohlcvData.latency
    When method GET
    Then status 200
    * print 'Response time:', responseTime 