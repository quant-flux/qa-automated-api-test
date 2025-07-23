@performance
Feature: Token Meta Performance Tests

  Background:
    * def metaData = read('classpath:data/performance/token-meta.json')
    * url baseUrl + '/tokens/meta'

  @baseline
  Scenario: Baseline performance test for token meta endpoint
    Given request metaData.baseline
    When method GET
    Then status 200

  @load
  Scenario: Load test for token meta endpoint
    Given request metaData.load
    When method GET
    Then status 200 