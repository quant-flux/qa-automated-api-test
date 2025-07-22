Feature: Token Price Multi Performance Tests

  Background:
    * url baseUrl + getEndpoint('token_price_multi')

  @performance @load
  Scenario: Load test for token price multi endpoint
    * def validAddresses = getTokenPriceMultiAddresses('multiple_tokens')
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And def responseTime = response.responseTime
    And match responseTime < 2000

  @performance @stress
  Scenario: Stress test for token price multi with maximum tokens
    * def maxAddresses = getTokenPriceMultiAddresses('maximum_tokens')
    And param addresses = maxAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And def responseTime = response.responseTime
    And match responseTime < 3000

  @performance @concurrent
  Scenario: Concurrent requests test for token price multi
    * def validAddresses = getTokenPriceMultiAddresses('single_token')
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And def responseTime = response.responseTime
    And match responseTime < 1500

  @performance @validation
  Scenario: Performance validation with data structure check
    * def validAddresses = getTokenPriceMultiAddresses('multiple_tokens')
    And param addresses = validAddresses
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And match response.data[0] contains { address: '#string', price: '#number' }
    And def responseTime = response.responseTime
    And match responseTime < 2000 