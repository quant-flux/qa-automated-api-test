Feature: Token Metadata Endpoint

  Background:
    * url baseUrl + getEndpoint('token_meta')

  @smoke @positive
  Scenario: Get token metadata for valid address
    * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.data == '#object'
    * def tokenData = response.data
    * validateTokenDataConstraints(tokenData)
    And match response.data.address == getValidTokenAddress(0)
    And def validationResult = validateBasicTokenFields(response.data)
    And match validationResult == true

  @positive
  Scenario: Get token metadata for another valid address
    * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(1)
    When method get
    Then status 200
    And match response.data.address == getValidTokenAddress(1)
    And def validationResult = validateTokenMetaSuccessResponse(response, false)
    And match validationResult == true

  @positive
  Scenario: Get token metadata for third valid address
    * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(2)
    When method get
    Then status 200
    And match response.data.address == getValidTokenAddress(2)
    And def validationResult = validateTokenMetaSuccessResponse(response, false)
    And match validationResult == true

  @negative
  Scenario: Get token metadata for invalid address format
    * url baseUrl + getEndpoint('token_meta') + getInvalidTokenAddress(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token metadata for empty address
    * url baseUrl + getEndpoint('token_meta') + getInvalidTokenAddress(1)
    When method get
    Then status 400

  @negative
  Scenario: Get token metadata for non-existent address
    * url baseUrl + getEndpoint('token_meta') + getInvalidTokenAddress(2)
    When method get
    Then status 404

  @validation @cleanup
  Scenario: Validate no unwanted fields are present in token metadata
    * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.data contains { address: '#string' }
    And def validationResult = validateTokenMetaSuccessResponse(response, true)
    And match validationResult == true

  @edge
  Scenario: Get token metadata with very long address
    * url baseUrl + getEndpoint('token_meta') + 'a'.repeat(1000)
    When method get
    Then status 400

  @edge
  Scenario: Get token metadata with special characters in address
    * url baseUrl + getEndpoint('token_meta') + '!@#$%^&*()'
    When method get
    Then status 400

  @edge
  Scenario: Get token metadata with numeric address
    * url baseUrl + getEndpoint('token_meta') + '1234567890123456789012345678901234567890'
    When method get
    Then status 400

  @edge
  Scenario: Get token metadata with mixed case address
    * url baseUrl + getEndpoint('token_meta') + 'AbCdEfGhIjKlMnOpQrStUvWxYz1234567890'
    When method get
    Then status 400