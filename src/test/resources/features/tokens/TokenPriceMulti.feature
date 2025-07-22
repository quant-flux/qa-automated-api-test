Feature: Token Price Multi Endpoint

  Background:
    * url baseUrl + getEndpoint('token_price_multi')

  @smoke @positive
  Scenario: Get price data for multiple tokens
    * def validAddresses = getTokenPriceMultiAddresses('multiple_tokens')
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And def validationResult = validateTokenPriceMultiFields(response.data[0])
    And match validationResult == true

  @positive
  Scenario: Get price data for single token
    * def singleAddress = getTokenPriceMultiAddresses('single_token')
    And param addresses = singleAddress
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0].address == singleAddress

  @boundary
  Scenario: Get price data for maximum tokens (10)
    * def maxAddresses = getTokenPriceMultiAddresses('maximum_tokens')
    And param addresses = maxAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data.length <= 10

  @negative
  Scenario: Get price data without addresses parameter
    When method get
    Then status 400

  @negative
  Scenario: Get price data with empty addresses array
    And param addresses = []
    When method get
    Then status 400

  @negative
  Scenario: Get price data with more than 10 addresses
    * def tooManyAddresses = getTokenPriceMultiAddresses('too_many_tokens')
    And param addresses = tooManyAddresses
    When method get
    Then status 400

  @negative
  Scenario: Get price data with invalid addresses format
    * def invalidAddress = getInvalidTokenAddress(0)
    And param addresses = invalidAddress
    When method get
    Then status 400

  @negative
  Scenario: Get price data for non-existent addresses
    * def nonExistentAddress = getInvalidTokenAddress(2)
    And param addresses = nonExistentAddress
    When method get
    Then status 404

  @validation
  Scenario: Validate price data structure for multiple tokens
    * def validAddresses = getTokenPriceMultiAddresses('multiple_tokens')
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0] contains { address: '#string', price: '#number', price_change_24h: '#number', price_change_percent_24h: '#number', volume_24h: '#number', market_cap: '#number' }

  @validation
  Scenario: Validate price data structure for single token
    * def singleAddress = getTokenPriceMultiAddresses('single_token')
    And param addresses = singleAddress
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0] contains { address: '#string', price: '#number', price_change_24h: '#number', price_change_percent_24h: '#number', volume_24h: '#number', market_cap: '#number', circulating_supply: '#number', total_supply: '#number', last_updated: '#string' }

  @edge
  Scenario: Get price data with mixed valid and invalid addresses
    * def mixedAddresses = getValidTokenAddress(0) + ',' + getInvalidTokenAddress(0)
    And param addresses = mixedAddresses
    When method get
    Then status 400

  @edge
  Scenario: Get price data with duplicate addresses
    * def duplicateAddresses = getValidTokenAddress(0) + ',' + getValidTokenAddress(0)
    And param addresses = duplicateAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array' 