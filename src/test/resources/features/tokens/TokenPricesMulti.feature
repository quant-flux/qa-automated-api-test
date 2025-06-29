Feature: Token Multi-Price Endpoint

  Background:
    * url baseUrl + getEndpoint('token_prices_multi')
    # Cargar datos desde JSON
    * def tokenAddresses = read('classpath:data/tokens/token-addresses.json')

  @smoke @positive
  Scenario: Get price variations for multiple tokens
    * def validAddresses = [tokenAddresses.valid_tokens[0].address, tokenAddresses.valid_tokens[1].address]
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.elements == '#array'
    And match response.data[0].address == '#string'
    And match response.data[0].price == '#number'
    And match response.data[0].price_5m == '#number'
    And match response.data[0].percent_5m == '#number'
    And match response.data[0].volume_5m == '#number'
    And match response.data[0].price_30m == '#number'
    And match response.data[0].percent_30m == '#number'
    And match response.data[0].volume_30m == '#number'
    And match response.data[0].price_1h == '#number'
    And match response.data[0].percent_1h == '#number'
    And match response.data[0].volume_1h == '#number'
    And match response.data[0].price_6h == '#number'
    And match response.data[0].percent_6h == '#number'
    And match response.data[0].volume_6h == '#number'
    And match response.data[0].price_24h == '#number'
    And match response.data[0].percent_24h == '#number'
    And match response.data[0].volume_24h == '#number'

  @positive
  Scenario: Get price variations for single token
    * def singleAddress = [tokenAddresses.valid_tokens[0].address]
    And param addresses = singleAddress
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0].address == tokenAddresses.valid_tokens[0].address

  @boundary
  Scenario: Get price variations for maximum tokens (10)
    * def maxAddresses = [tokenAddresses.valid_tokens[0].address, tokenAddresses.valid_tokens[1].address, tokenAddresses.valid_tokens[2].address, '11111111111111111111111111111111', '22222222222222222222222222222222', '33333333333333333333333333333333', '44444444444444444444444444444444', '55555555555555555555555555555555', '66666666666666666666666666666666', '77777777777777777777777777777777']
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
    * def tooManyAddresses = [tokenAddresses.valid_tokens[0].address, tokenAddresses.valid_tokens[1].address, tokenAddresses.valid_tokens[2].address, '11111111111111111111111111111111', '22222222222222222222222222222222', '33333333333333333333333333333333', '44444444444444444444444444444444', '55555555555555555555555555555555', '66666666666666666666666666666666', '77777777777777777777777777777777', '88888888888888888888888888888888']
    And param addresses = tooManyAddresses
    When method get
    Then status 400

  @negative
  Scenario: Get price variations with invalid addresses format
    * def invalidAddress = [tokenAddresses.invalid_tokens[0].address]
    And param addresses = invalidAddress
    When method get
    Then status 400 

  @negative
  Scenario: Get price variations for non-existent addresses
    * def nonExistentAddress = [tokenAddresses.invalid_tokens[2].address]
    And param addresses = nonExistentAddress
    When method get
    Then status 404