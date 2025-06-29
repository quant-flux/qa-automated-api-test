Feature: Trade List Endpoint

  Background:
    * url baseUrl + getEndpoint('trade_list')

  @smoke @positive
  Scenario: Get recent trades for valid token
    * url baseUrl + getEndpoint('trade_list') + getValidToken(0).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get recent trades for another token
    * url baseUrl + getEndpoint('trade_list') + getValidToken(1).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @negative
  Scenario: Get recent trades for invalid address format
    * url baseUrl + getEndpoint('trade_list') + getInvalidToken(0).address
    When method get
    Then status 400

  @negative
  Scenario: Get recent trades for empty address
    * url baseUrl + getEndpoint('trade_list') + getInvalidToken(1).address
    When method get
    Then status 400

  @negative
  Scenario: Get recent trades for non-existent address
    * url baseUrl + getEndpoint('trade_list') + getInvalidToken(2).address
    When method get
    Then status 404