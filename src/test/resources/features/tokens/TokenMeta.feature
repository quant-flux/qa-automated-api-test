Feature: Token Metadata Endpoint

  Background:
    * url baseUrl + getEndpoint('token_meta')

  @smoke @positive
  Scenario: Get token metadata for valid address
    * url baseUrl + getEndpoint('token_meta') + getValidToken(0).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidToken(0).address

  @positive
  Scenario: Get token metadata for another valid address
    * url baseUrl + getEndpoint('token_meta') + getValidToken(1).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidToken(1).address

  @positive
  Scenario: Get token metadata for third valid address
    * url baseUrl + getEndpoint('token_meta') + getValidToken(2).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidToken(2).address

  @negative
  Scenario: Get token metadata for invalid address format
    * url baseUrl + getEndpoint('token_meta') + getInvalidToken(0).address
    When method get
    Then status 400

  @negative
  Scenario: Get token metadata for empty address
    * url baseUrl + getEndpoint('token_meta') + getInvalidToken(1).address
    When method get
    Then status 400

  @negative
  Scenario: Get token metadata for non-existent address
    * url baseUrl + getEndpoint('token_meta') + getInvalidToken(2).address
    When method get
    Then status 404