Feature: Health Check Endpoint

  Background:
    * url baseUrl + '/'

  @smoke @positive
  Scenario: Get service health status
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.status == 'ok'
    And match response.data.uptime == '#number' 