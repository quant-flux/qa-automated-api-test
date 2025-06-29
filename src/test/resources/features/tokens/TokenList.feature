Feature: Token List Endpoint

  Background:
    * url baseUrl + getEndpoint('token_list')

  @smoke @positive
  Scenario: Get token list with default parameters
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.elements == '#array'

  @positive
  Scenario: Get token list sorted by created_time descending
    And param sort_by = 'created_time'
    And param order = 'desc'
    And param page = 1
    And param limit = 10
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.elements == '#array'

  @positive
  Scenario: Get token list with pagination
    And param page = 2
    And param limit = 10
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.elements == '#array'

  @positive
  Scenario: Get token list with different sort options
    And param sort_by = 'created_time'
    And param order = 'asc'
    When method get
    Then status 200
    And match response.status == 'success'

  @positive
  Scenario: Get token list with maximum limit
    And param limit = 100
    When method get
    Then status 200
    And match response.status == 'success'

  @negative
  Scenario: Get token list with invalid page number
    And param page = 0
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid limit
    And param limit = 0
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid sort field
    And param sort_by = 'invalid_field'
    When method get
    Then status 400

  @negative
  Scenario: Get token list with invalid order
    And param order = 'invalid'
    When method get
    Then status 400
