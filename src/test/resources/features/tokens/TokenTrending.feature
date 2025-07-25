Feature: Token Trending Endpoint

  Background:
    * url baseUrl + getEndpoint('token_trending')

  @smoke @positive
  Scenario: Get trending tokens with default parameters
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, true)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with small limit
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(1)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 5)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with medium limit
    And param minutes = getValidTrendingMinutes(2)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with large limit
    And param minutes = getValidTrendingMinutes(3)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(4)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 20)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with minimum limit
    And param minutes = getValidTrendingMinutes(0)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(0)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 1)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with maximum limit
    And param minutes = getValidTrendingMinutes(4)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(7)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 100)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with ascending order
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(0)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens ordered by count
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(0)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with combined parameters
    And param minutes = getValidTrendingMinutes(2)
    And param order = getValidTrendingOrder(0)
    And param orderField = getValidTrendingOrderField(0)
    And param limit = getValidTrendingLimit(3)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 15)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @boundary
  Scenario: Get trending tokens with minimum minutes
    And param minutes = getValidTrendingMinutes(0)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true

  @boundary
  Scenario: Get trending tokens with maximum minutes
    And param minutes = getValidTrendingMinutes(4)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true

  @negative
  Scenario: Get trending tokens without required parameters
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid minutes (zero)
    And param minutes = getInvalidTrendingMinutes(0)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid minutes (negative)
    And param minutes = getInvalidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid minutes (too high)
    And param minutes = getInvalidTrendingMinutes(3)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid order
    And param minutes = getValidTrendingMinutes(1)
    And param order = getInvalidTrendingOrder(0)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid order field
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getInvalidTrendingOrderField(0)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid limit (zero)
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getInvalidTrendingLimit(0)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid limit (too high)
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getInvalidTrendingLimit(3)
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid parameter types
    And param minutes = getInvalidTrendingMinutes(5)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 400

  @validation
  Scenario: Validate trending tokens response structure
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#[0,10]'
    * def trendingToken = response.data[0]
    And match trendingToken.address == '#regex [1-9A-HJ-NP-Za-km-z]{32,44}'
    And match trendingToken.name == '#string'
    And match trendingToken.name != ''
    And match trendingToken.symbol == '#string'
    And match trendingToken.symbol != ''
    And match trendingToken.price == '#number'
    And match trendingToken.price >= 0
    And match trendingToken.volume_24h == '#number'
    And match trendingToken.volume_24h >= 0
    And match trendingToken.percent_change_24h == '#number'
    And match trendingToken.market_cap == '#? _ == null || _ == "#number"'
    And match trendingToken.image == '#? _ == null || _ == "#regex ^https://static\\.cloud-service-app\\.com.*"'
    And match trendingToken.created_time == '#number'
    And match trendingToken.created_time.toString().length == 10

  @validation
  Scenario: Validate trending tokens are sorted by volume
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#[0,10]'
    * def tokens = response.data
    And def sortValidation = validateTrendingTokensSorting(tokens)
    And match sortValidation == true

  @validation
  Scenario: Validate no unwanted fields in trending tokens response
    And param minutes = getValidTrendingMinutes(1)
    And param order = getValidTrendingOrder(1)
    And param orderField = getValidTrendingOrderField(1)
    And param limit = getValidTrendingLimit(2)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#[0,10]'
    And def validationResult = validateNoUnwantedFieldsInArray(response.data)
    And match validationResult == true

 