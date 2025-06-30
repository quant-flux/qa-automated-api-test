Feature: Trade OHLCV Endpoint

  Background:
    * url baseUrl + getEndpoint('trade_ohlcv')

  @smoke @positive
  Scenario: Get OHLCV data for valid token with 1h interval
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidTokenAddress(0)
    And param interval = getOHLCVInterval(0)
    And param price_format = getOHLCVPriceFormat(0)
    And param chart_format = getOHLCVChartFormat(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get OHLCV data for another valid token with 5m interval
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidTokenAddress(1)
    And param interval = getOHLCVInterval(1)
    And param price_format = getOHLCVPriceFormat(1)
    And param chart_format = getOHLCVChartFormat(1)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get OHLCV data with market cap chart format
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidTokenAddress(0)
    And param interval = getOHLCVInterval(5)
    And param price_format = getOHLCVPriceFormat(5)
    And param chart_format = getOHLCVChartFormat(5)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @positive
  Scenario: Get OHLCV data with different intervals
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidTokenAddress(0)
    And param interval = getOHLCVInterval(2)
    And param price_format = getOHLCVPriceFormat(2)
    And param chart_format = getOHLCVChartFormat(2)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'

  @negative
  Scenario: Get OHLCV data with invalid interval
    * url baseUrl + getEndpoint('trade_ohlcv') + getValidTokenAddress(0)
    And param interval = getOHLCVInterval(8)
    And param price_format = getOHLCVPriceFormat(8)
    And param chart_format = getOHLCVChartFormat(8)
    When method get
    Then status 400

  @negative
  Scenario: Get OHLCV data for invalid address format
    * url baseUrl + getEndpoint('trade_ohlcv') + getInvalidTokenAddress(0)
    And param interval = getOHLCVInterval(0)
    And param price_format = getOHLCVPriceFormat(0)
    And param chart_format = getOHLCVChartFormat(0)
    When method get
    Then status 400

  @negative @api-bug @current-behavior
  Scenario: Get OHLCV data for empty address - Current API Behavior
    # Test que documenta el comportamiento actual (incorrecto) de la API
    # Este test pasa pero documenta un bug
    * url baseUrl + getEndpoint('trade_ohlcv') + getInvalidTokenAddress(1)
    And param interval = getOHLCVInterval(0)
    And param price_format = getOHLCVPriceFormat(0)
    And param chart_format = getOHLCVChartFormat(0)
    When method get
    Then status 404

  @negative @api-bug @current-behavior
  Scenario: Get OHLCV data for non-existent address - Current API Behavior
    # Test que documenta el comportamiento actual (incorrecto) de la API
    # Este test pasa pero documenta un bug
    * url baseUrl + getEndpoint('trade_ohlcv') + getInvalidTokenAddress(2)
    And param interval = getOHLCVInterval(0)
    And param price_format = getOHLCVPriceFormat(0)
    And param chart_format = getOHLCVChartFormat(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'