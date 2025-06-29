Feature: Trade OHLCV Endpoint

  Background:
    * url baseUrl + getEndpoint('trade_ohlcv')

  @smoke @positive
  Scenario: Get OHLCV data for valid token with 1h interval
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidToken(0).address
    And param interval = '1h'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get OHLCV data for another valid token with 5m interval
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidToken(1).address
    And param interval = '5m'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get OHLCV data with market cap chart format
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidToken(0).address
    And param interval = '1h'
    And param price_format = 'USD'
    And param chart_format = 'mcap'
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get OHLCV data with different intervals
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidToken(0).address
    And param interval = '15m'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @negative
  Scenario: Get OHLCV data with invalid interval
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidToken(0).address
    And param interval = 'invalid_interval'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 400

  @negative
  Scenario: Get OHLCV data for invalid address format
    * url baseUrl + getEndpoint('trade_ohlcv') + getInvalidToken(0).address
    And param interval = '1h'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 400 

  @negative
  Scenario: Get OHLCV data for empty address
    * url baseUrl + getEndpoint('trade_ohlcv') + getInvalidToken(1).address
    And param interval = '1h'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 400

  @negative
  Scenario: Get OHLCV data for non-existent address
    * url baseUrl + getEndpoint('trade_ohlcv') + getInvalidToken(2).address
    And param interval = '1h'
    And param price_format = 'USD'
    And param chart_format = 'price'
    When method get
    Then status 404