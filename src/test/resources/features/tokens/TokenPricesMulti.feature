Feature: Token Multi-Price Endpoint

  Background:
    * url baseUrl + getEndpoint('token_prices_multi')

  @smoke @positive
  Scenario: Get price variations for multiple tokens
    * def validAddresses = getTokenPricesMultiAddresses('multiple_tokens')
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And def validationResult = validateTokenPricesMultiFields(response.data[0])
    And match validationResult == true

  @positive
  Scenario: Get price variations for single token
    * def singleAddress = getTokenPricesMultiAddresses('single_token')
    And param addresses = singleAddress
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0].address == singleAddress

  @boundary
  Scenario: Get price variations for maximum tokens (10)
    * def maxAddresses = getTokenPricesMultiAddresses('maximum_tokens')
    And param addresses = maxAddresses
    When method get
    Then status 200
    And match response.status == 'success'

  @negative
  Scenario: Get price variations without addresses parameter
    When method get
    Then status 400

  @negative
  Scenario: Get price variations with empty addresses array
    And param addresses = []
    When method get
    Then status 400

  @negative
  Scenario: Get price variations with more than 10 addresses
    * def tooManyAddresses = getTokenPricesMultiAddresses('too_many_tokens')
    And param addresses = tooManyAddresses
    When method get
    Then status 400

  @negative
  Scenario: Get price variations with invalid addresses format
    * def invalidAddress = getInvalidTokenAddress(0)
    And param addresses = invalidAddress
    When method get
    Then status 400

  @negative
  Scenario: Get price variations for non-existent addresses
    * def nonExistentAddress = getInvalidTokenAddress(2)
    And param addresses = nonExistentAddress
    When method get
    Then status 404