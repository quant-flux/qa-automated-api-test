Feature: Token Holders Endpoint

  Background:
    * url baseUrl + getEndpoint('token_holders')

  @smoke @positive
  Scenario: Get token holders for valid address
    * url baseUrl + getEndpoint('token_holders') + getValidToken(0).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0].address == '#string'
    And match response.data[0].amount == '#number'

  @positive
  Scenario: Get token holders for another valid address
    * url baseUrl + getEndpoint('token_holders') + getValidToken(1).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @negative
  Scenario: Get token holders for invalid address format
    * url baseUrl + getEndpoint('token_holders') + getInvalidToken(0).address
    When method get
    Then status 400

  @negative
  Scenario: Get token holders for empty address
    * url baseUrl + getEndpoint('token_holders') + getInvalidToken(1).address
    When method get
    Then status 400

  @negative
  Scenario: Get token holders for non-existent address
    * url baseUrl + getEndpoint('token_holders') + getInvalidToken(2).address
    When method get
    Then status 404 