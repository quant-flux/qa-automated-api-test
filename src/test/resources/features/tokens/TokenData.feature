Feature: Token Data Endpoint

  Background:
    * url baseUrl + getEndpoint('token_data')

  @smoke @positive
  Scenario: Get complete token data for valid address
    * url baseUrl + getEndpoint('token_data') + getValidToken(0).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidToken(0).address
    And match response.data.name == '#string'
    And match response.data.symbol == '#string'
    And match response.data.image == '#string'
    And match response.data.decimals == '#number'
    And match response.data.creator == '#string'
    And match response.data.create_tx == '#string'
    And match response.data.created_time == '#number'
    And match response.data.total_supply == '#string'
    And match response.data.supply == '#string'
    And match response.data.holders == '#number'
    And match response.data.price == '#number'
    And match response.data.volume_24h == '#number'
    And match response.data.market_cap == '#number'
    And match response.data.price_change_24h == '#number'

  @positive
  Scenario: Get token data with market information
    * url baseUrl + getEndpoint('token_data') + getValidToken(1).address
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.price == '#number'
    And match response.data.volume_24h == '#number'
    And match response.data.market_cap == '#number'

  @negative
  Scenario: Get token data for invalid address format
    * url baseUrl + getEndpoint('token_data') + getInvalidToken(0).address
    When method get
    Then status 400

  @negative
  Scenario: Get token data for empty address
    * url baseUrl + getEndpoint('token_data') + getInvalidToken(1).address
    When method get
    Then status 400

  @negative
  Scenario: Get token data for non-existent address
    * url baseUrl + getEndpoint('token_data') + getInvalidToken(2).address
    When method get
    Then status 404 