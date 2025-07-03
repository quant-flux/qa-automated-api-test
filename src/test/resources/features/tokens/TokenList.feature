Feature: Token List Endpoint

  Background:
    * url baseUrl + getEndpoint('token_list')

  @smoke @positive
  Scenario: Get token list with default parameters
    When method get
    Then status 200
    And def validationResult = validateTokenListSuccessResponse(response, true)
    And match validationResult == true

  @positive
  Scenario: Get token list sorted by created_time descending
    And param sort_by = getValidSortBy(0)
    And param order = getValidOrder(1)
    And param page = getValidPage(0)
    And param limit = getValidLimit(0)
    When method get
    Then status 200
    And def validationResult = validateTokenListSuccessResponse(response, true)
    And match validationResult == true

  @positive
  Scenario: Get token list with pagination
    And param page = getValidPage(1)
    And param limit = getValidLimit(0)
    When method get
    Then status 200
    And def validationResult = validateTokenListSuccessResponse(response, true)
    And match validationResult == true

  @positive
  Scenario: Get token list with different sort options
    And param sort_by = getValidSortBy(0)
    And param order = getValidOrder(0)
    When method get
    Then status 200
    And def validationResult = validateTokenListSuccessResponse(response, true)
    And match validationResult == true

  @positive
  Scenario: Get token list with maximum limit
    And param limit = getValidLimit(3)
    When method get
    Then status 200
    And def validationResult = validateTokenListSuccessResponse(response, true)
    And match validationResult == true

  @positive
  Scenario: Get token list with valid pagination parameters
    And param page = getValidPage(2)
    And param limit = getValidLimit(1)
    When method get
    Then status 200
    And def validationResult = validateTokenListSuccessResponse(response, true)
    And match validationResult == true

  @negative
  Scenario: Get token list with invalid page number
    And param page = getInvalidPage(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid limit
    And param limit = getInvalidLimit(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid sort field
    And param sort_by = getInvalidSortBy(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid order
    And param order = getInvalidOrder(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid sort parameters from helper
    And param sort_by = getInvalidSortBy(1)
    And param order = getInvalidOrder(1)
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid pagination parameters from helper
    And param page = getInvalidPage(1)
    And param limit = getInvalidLimit(1)
    When method get
    Then status 400
