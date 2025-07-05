Feature: Token Trending Endpoint

  Background:
    * url baseUrl + getEndpoint('token_trending')

  @smoke @positive
  Scenario: Get trending tokens with default parameters
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, true)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with small limit
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 5
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 5)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with medium limit
    And param minutes = 10
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with large limit
    And param minutes = 15
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 20
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 20)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with minimum limit
    And param minutes = 1
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 1
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 1)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with maximum limit
    And param minutes = 20
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 100
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 100)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with ascending order
    And param minutes = 5
    And param order = 'ASC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens ordered by count
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'count'
    And param limit = 10
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @positive
  Scenario: Get trending tokens with combined parameters
    And param minutes = 10
    And param order = 'ASC'
    And param orderField = 'count'
    And param limit = 15
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 15)
    And match validationResult == true
    And def detailedValidation = validateTrendingTokensResponse(response, false)
    And match detailedValidation == true

  @boundary
  Scenario: Get trending tokens with minimum minutes
    And param minutes = 1
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 200
    And def validationResult = validateTrendingTokensBasic(response, 10)
    And match validationResult == true

  @boundary
  Scenario: Get trending tokens with maximum minutes
    And param minutes = 20
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
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
    And param minutes = 0
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid minutes (negative)
    And param minutes = -1
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid minutes (too high)
    And param minutes = 21
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid order
    And param minutes = 5
    And param order = 'asc'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid order field
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'price'
    And param limit = 10
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid limit (zero)
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 0
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid limit (too high)
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 101
    When method get
    Then status 400

  @negative
  Scenario: Get trending tokens with invalid parameter types
    And param minutes = 'invalid'
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 400

  @validation
  Scenario: Validate trending tokens response structure
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
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
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#[0,10]'
    * def tokens = response.data
    And def sortValidation = validateTrendingTokensSorting(tokens)
    And match sortValidation == true

  @validation
  Scenario: Validate no unwanted fields in trending tokens response
    And param minutes = 5
    And param order = 'DESC'
    And param orderField = 'volume'
    And param limit = 10
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#[0,10]'
    And def validationResult = validateNoUnwantedFieldsInArray(response.data)
    And match validationResult == true

 