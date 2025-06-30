Feature: Token Price Endpoints

  Background:
    * url baseUrl + getEndpoint('token_price')

  @smoke @positive
  Scenario: Get current price for single token
    * url baseUrl + getEndpoint('token_price') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidTokenAddress(0)
    And match response.data.price == '#number'

  @positive
  Scenario: Get current price for another token
    * url baseUrl + getEndpoint('token_price') + getValidTokenAddress(1)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.price == '#number'

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
    And match response.status == 'success'
    And match response.data contains { address: '#string' }
    And def validationResult = validateNoUnwantedFields(response.data)
    And match validationResult == true