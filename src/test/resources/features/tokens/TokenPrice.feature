Feature: Token Price Endpoints

  Background:
    * url baseUrl + getEndpoint('token_price')

  @smoke @positive
  Scenario: Get current price for single token
    * url baseUrl + getEndpoint('token_price') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.data.address == getValidTokenAddress(0)
    And def validationResult = validateTokenPriceSuccessResponse(response, false)
    And match validationResult == true

  @positive
  Scenario: Get current price for another token
    * url baseUrl + getEndpoint('token_price') + getValidTokenAddress(1)
    When method get
    Then status 200
    And def validationResult = validateTokenPriceSuccessResponse(response, false)
    And match validationResult == true

  @negative
  Scenario: Get price for invalid address format
    * url baseUrl + getEndpoint('token_price') + getInvalidTokenAddress(0)
    When method get
    Then status 400
  
  @negative
  Scenario: Get price for empty address
    * url baseUrl + getEndpoint('token_price') + getInvalidTokenAddress(1)
    When method get
    Then status 400

  @negative
  Scenario: Get price for non-existent address
    * url baseUrl + getEndpoint('token_price') + getInvalidTokenAddress(2)
    When method get
    Then status 404

  @validation @cleanup
  Scenario: Validate no unwanted fields are present in token price
    * url baseUrl + getEndpoint('token_price') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.data contains { address: '#string' }
    And def validationResult = validateTokenPriceSuccessResponse(response, true)
    And match validationResult == true

  @edge
  Scenario: Get price with very long address
    * url baseUrl + getEndpoint('token_price') + 'a'.repeat(1000)
    When method get
    Then status 400

  @edge
  Scenario: Get price with special characters in address
    * url baseUrl + getEndpoint('token_price') + '!@#$%^&*()'
    When method get
    Then status 400

  @edge
  Scenario: Get price with numeric address
    * url baseUrl + getEndpoint('token_price') + '1234567890123456789012345678901234567890'
    When method get
    Then status 400

  @edge
  Scenario: Get price with mixed case address
    * url baseUrl + getEndpoint('token_price') + 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'
    When method get
    Then status 400

