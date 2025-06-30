Feature: Token Holders Endpoint

  Background:
    * url baseUrl + getEndpoint('token_holders')

  @smoke @positive
  Scenario: Get token holders for valid address
    * url baseUrl + getEndpoint('token_holders') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0].address == '#string'
    And match response.data[0].amount == '#number'

  @positive
  Scenario: Get token holders for another valid address
    * url baseUrl + getEndpoint('token_holders') + getValidTokenAddress(1)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

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
    And match response.status == 'success'
    And match response.data == '#array'
    And def validationResult = validateNoUnwantedFieldsInArray(response.data)
    And match validationResult == true 