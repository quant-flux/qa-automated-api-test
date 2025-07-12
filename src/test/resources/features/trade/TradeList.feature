Feature: Trade List Endpoint

  Background:
    * url baseUrl + getEndpoint('trade_list')

  @smoke @positive
  Scenario: Get recent trades for valid token
    * url baseUrl + getEndpoint('trade_list') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get recent trades for another token
    * url baseUrl + getEndpoint('trade_list') + getValidTokenAddress(1)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @negative
  Scenario: Get recent trades for invalid address format
    * url baseUrl + getEndpoint('trade_list') + getInvalidTokenAddress(0)
    When method get
    Then status 400

  @negative
  Scenario: Get recent trades for empty address
    * url baseUrl + getEndpoint('trade_list') + getInvalidTokenAddress(1)
    When method get
    Then status 400

  @negative
  Scenario: Get recent trades for non-existent address
    * url baseUrl + getEndpoint('trade_list') + getInvalidTokenAddress(2)
    When method get
    Then status 404

  @edge
  Scenario: Get recent trades with very long address
    * url baseUrl + getEndpoint('trade_list') + 'a'.repeat(1000)
    When method get
    Then status 400

  @edge
  Scenario: Get recent trades with special characters in address
    * url baseUrl + getEndpoint('trade_list') + '!@#$%^&*()'
    When method get
    Then status 400

  @edge
  Scenario: Get recent trades with numeric address
    * url baseUrl + getEndpoint('trade_list') + '1234567890123456789012345678901234567890'
    When method get
    Then status 400

  @edge
  Scenario: Get recent trades with mixed case address
    * url baseUrl + getEndpoint('trade_list') + 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'
    When method get
    Then status 400

