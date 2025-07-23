@performance
Feature: Token Trending Performance Tests

  Background:
    * def trendingData = read('classpath:data/performance/trending-tokens.json')
    * url baseUrl + '/tokens/trending'

  @baseline
  Scenario: Baseline performance test for trending tokens endpoint
    Given request trendingData.baseline
    When method GET
    Then status 200
    And match response == trendingData.expected

  @load
  Scenario: Load test for trending tokens endpoint
    Given request trendingData.load
    When method GET
    Then status 200

  @stress
  Scenario: Stress test for trending tokens endpoint
    Given request trendingData.stress
    When method GET
    Then status 200

  @latency
  Scenario: Latency test for trending tokens endpoint
    Given request trendingData.latency
    When method GET
    Then status 200
    * print 'Response time:', responseTime 