Feature: Token Price Variations Endpoint

  Background:
    * url baseUrl + getEndpoint('token_prices')

  @smoke @positive
  Scenario: Get price variations for single token
    * url baseUrl + getEndpoint('token_prices') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidTokenAddress(0)
    And def validationResult = validatePriceVariationsFields(response.data)
    And match validationResult == true

  @positive
  Scenario: Get price variations for another token
    * url baseUrl + getEndpoint('token_prices') + getValidTokenAddress(1)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.price == '#number'

  @negative
  Scenario: Get price variations for invalid address format
    * url baseUrl + getEndpoint('token_prices') + getInvalidTokenAddress(0)
    When method get
    Then status 400

  @negative
  Scenario: Get price variations for empty address
    * url baseUrl + getEndpoint('token_prices') + getInvalidTokenAddress(1)
    When method get
    Then status 400

  @negative
  Scenario: Get price variations for non-existent address
    * url baseUrl + getEndpoint('token_prices') + getInvalidTokenAddress(2)
    When method get
    Then status 404 