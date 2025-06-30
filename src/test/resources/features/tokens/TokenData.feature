Feature: Token Data Endpoint

  Background:
    * url baseUrl + getEndpoint('token_data')

  @smoke @positive
  Scenario: Get complete token data for valid address
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data.address == getValidTokenAddress(0)
    And def validationResult = validateTokenDataFields(response.data)
    And match validationResult == true

  @positive
  Scenario: Get token data with market information
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(1)
    When method get
    Then status 200
    And match response.status == 'success'
    And def basicValidation = validateBasicTokenFields(response.data)
    And match basicValidation == true
    And def marketValidation = validateMarketFields(response.data)
    And match marketValidation == true

  @positive
  Scenario: Get token data for third valid token
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(2)
    When method get
    Then status 200
    And match response.status == 'success'
    And def validationResult = validateTokenDataFields(response.data)
    And match validationResult == true

  @negative
  Scenario: Get token data for invalid address format
    * url baseUrl + getEndpoint('token_data') + getInvalidTokenAddress(0)
    When method get
    Then status 400

  @negative
  Scenario: Get token data for empty address
    * url baseUrl + getEndpoint('token_data') + getInvalidTokenAddress(1)
    When method get
    Then status 400

  @negative
  Scenario: Get token data for non-existent address
    * url baseUrl + getEndpoint('token_data') + getInvalidTokenAddress(2)
    When method get
    Then status 404

  @positive
  Scenario: Get token data for valid address
    * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
    When method get
    Then status 200
    And match response.status == 'success'
    And match response.data == '#object'
    * def tokenData = response.data
    * validateTokenDataConstraints(tokenData) 