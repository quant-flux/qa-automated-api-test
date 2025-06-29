Feature: Token Price Endpoints

  Background:
    * url baseUrl + getEndpoint('token_price')

  @smoke @positive
  Scenario: Get current price for single token
    * url baseUrl + getEndpoint('token_price') + getValidToken(0).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidToken(0).address
    And match response.data.price == '#number'

  @positive
  Scenario: Get current price for another token
    * url baseUrl + getEndpoint('token_price') + getValidToken(1).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.price == '#number'

  @negative
  Scenario: Get price for invalid address format
    * url baseUrl + getEndpoint('token_price') + getInvalidToken(0).address
    When method get
    Then status 400
  
  @negative
  Scenario: Get price for empty address
    * url baseUrl + getEndpoint('token_price') + getInvalidToken(1).address
    When method get
    Then status 400

  @negative
  Scenario: Get price for non-existent address
    * url baseUrl + getEndpoint('token_price') + getInvalidToken(2).address
    When method get
    Then status 404