Feature: Token Price Variations Endpoint

  Background:
    * url baseUrl + getEndpoint('token_prices')

  @smoke @positive
  Scenario: Get price variations for single token
    * url baseUrl + getEndpoint('token_prices') + getValidToken(0).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidToken(0).address
    And match response.data.price == '#number'
    And match response.data.price_5m == '#number'
    And match response.data.percent_5m == '#number'
    And match response.data.volume_5m == '#number'
    And match response.data.price_30m == '#number'
    And match response.data.percent_30m == '#number'
    And match response.data.volume_30m == '#number'
    And match response.data.price_1h == '#number'
    And match response.data.percent_1h == '#number'
    And match response.data.volume_1h == '#number'
    And match response.data.price_6h == '#number'
    And match response.data.percent_6h == '#number'
    And match response.data.volume_6h == '#number'
    And match response.data.price_24h == '#number'
    And match response.data.percent_24h == '#number'
    And match response.data.volume_24h == '#number'

  @positive
  Scenario: Get price variations for another token
    * url baseUrl + getEndpoint('token_prices') + getValidToken(1).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.price == '#number'

  @negative
  Scenario: Get price variations for invalid address format
    * url baseUrl + getEndpoint('token_prices') + getInvalidToken(0).address
    When method get
    Then status 400

  @negative
  Scenario: Get price variations for empty address
    * url baseUrl + getEndpoint('token_prices') + getInvalidToken(1).address
    When method get
    Then status 400

  @negative
  Scenario: Get price variations for non-existent address
    * url baseUrl + getEndpoint('token_prices') + getInvalidToken(2).address
    When method get
    Then status 404 