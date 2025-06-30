Feature: Data Cleanup Validations

  Background:
    * url baseUrl

  @validation @cleanup
  Scenario: Validate token data has no unwanted fields
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And def validationResult = validateNoUnwantedFields(response.data)
    And match validationResult == true

  @validation @cleanup
  Scenario: Validate token metadata has no unwanted fields
    * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And def validationResult = validateNoUnwantedFields(response.data)
    And match validationResult == true

  @validation @cleanup
  Scenario: Validate token price has no unwanted fields
    * url baseUrl + getEndpoint('token_price') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And def validationResult = validateNoUnwantedFields(response.data)
    And match validationResult == true

  @validation @cleanup
  Scenario: Validate token prices has no unwanted fields
    * url baseUrl + getEndpoint('token_prices') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And def validationResult = validateNoUnwantedFields(response.data)
    And match validationResult == true

  @validation @cleanup
  Scenario: Validate token holders array has no unwanted fields
    * url baseUrl + getEndpoint('token_holders') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#array'
    And def validationResult = validateNoUnwantedFieldsInArray(response.data)
    And match validationResult == true 