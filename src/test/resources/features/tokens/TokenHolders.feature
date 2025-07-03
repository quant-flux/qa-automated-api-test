Feature: Token Holders Endpoint

  Background:
    * url baseUrl + getEndpoint('token_holders')

  @smoke @positive
  Scenario: Get token holders for valid address
    * url baseUrl + getEndpoint('token_holders') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.data[0].address == '#string'
    And match response.data[0].amount == '#number'
    And def validationResult = validateTokenHoldersSuccessResponse(response, false)
    And match validationResult == true

  @positive
  Scenario: Get token holders for another valid address
    * url baseUrl + getEndpoint('token_holders') + getValidTokenAddress(1)
    When method get
    Then status 200
    And def validationResult = validateTokenHoldersSuccessResponse(response, false)
    And match validationResult == true

  @negative
  Scenario: Get token holders for invalid address format
    * url baseUrl + getEndpoint('token_holders') + getInvalidTokenAddress(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token holders for empty address
    * url baseUrl + getEndpoint('token_holders') + getInvalidTokenAddress(1)
    When method get
    Then status 400

  @negative
  Scenario: Get token holders for non-existent address
    * url baseUrl + getEndpoint('token_holders') + getInvalidTokenAddress(2)
    When method get
    Then status 404

  @validation @cleanup
  Scenario: Validate no unwanted fields are present in token holders
    * url baseUrl + getEndpoint('token_holders') + getValidTokenAddress(0)
    When method get
    Then status 200
    And def validationResult = validateTokenHoldersSuccessResponse(response, true)
    And match validationResult == true 