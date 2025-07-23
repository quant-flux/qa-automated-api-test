@performance
Feature: Health Check Performance Tests

  Background:
    * def healthData = read('classpath:data/performance/health-check.json')
    * url baseUrl + '/health'

  @latency
  Scenario: Latency test for health check endpoint
    Given request healthData.latency
    When method GET
    Then status 200
    * print 'Response time:', responseTime

  @endurance
  Scenario: Endurance test for health check endpoint
    Given request healthData.endurance
    When method GET
    Then status 200 