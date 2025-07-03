Feature: Token New Listing Endpoint

  Background:
    * url baseUrl + getEndpoint('token_new_listing')

  @smoke @positive
  Scenario: Get new listings with default parameters
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, true)
    And match validationResult == true

  @positive
  Scenario: Get new listings with pagination
    And param page = getValidNewListingPage(0)
    And param limit = getValidNewListingLimit(0)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, false, true)
    And match validationResult == true

  @positive
  Scenario: Get new listings with maximum limit
    And param limit = getValidNewListingLimit(3)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, false, true)
    And match validationResult == true

  @positive
  Scenario: Get new listings with different page numbers
    And param page = getValidNewListingPage(1)
    And param limit = getValidNewListingLimit(1)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, false, true)
    And match validationResult == true

  @positive
  Scenario: Get new listings with medium limit
    And param limit = getValidNewListingLimit(1)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, false, true)
    And match validationResult == true

  @positive
  Scenario: Get new listings filtered by created_on pumpfun
    And param created_on = getValidNewListingCreatedOn(0)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true

  @positive
  Scenario: Get new listings filtered by created_on raydium_launchpad
    And param created_on = getValidNewListingCreatedOn(5)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true

  @positive
  Scenario: Get new listings with combined filters
    And param created_on = getValidNewListingCreatedOn(0)
    And param page = getValidNewListingPage(0)
    And param limit = getValidNewListingLimit(1)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true

  @positive
  Scenario: Get new listings with created_on and pagination
    And param created_on = getValidNewListingCreatedOn(1)
    And param page = getValidNewListingPage(2)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true

  @positive
  Scenario: Get new listings with maximum pagination
    And param page = getValidNewListingPage(3)
    And param limit = getValidNewListingLimit(3)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true
  
  @positive
  Scenario: Get new listings without page parameter
    And param created_on = getValidNewListingCreatedOn(0)
    And param limit = getValidNewListingLimit(1)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true

  @positive
  Scenario: Get new listings without limit parameter
    And param created_on = getValidNewListingCreatedOn(0)
    And param page = getValidNewListingPage(1)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, true)
    And match validationResult == true

  @positive
  Scenario: Get new listings without created_on parameter
    And param page = getValidNewListingPage(1)
    And param limit = getValidNewListingLimit(1)
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, true, false)
    And match validationResult == true

  @negative
  Scenario: Get new listings with invalid page number
    And param page = getInvalidNewListingPage(0)
    When method get
    Then status 400
    
  @negative
  Scenario: Get new listings with empty page number
    And param page = getInvalidNewListingPage(4)
    When method get
    Then status 400

  @negative
  Scenario: Get new listings with invalid limit
    And param limit = getInvalidNewListingLimit(0)
    When method get
    Then status 400
  
  @positive
  Scenario: Get new listings with empty limit parameter
    And param limit = getInvalidNewListingLimit(5)
    When method get
    Then status 400

  @negative
  Scenario: Get new listings with invalid created_on
    And param created_on = getInvalidNewListingCreatedOn(0)
    When method get
    Then status 400

  @negative
  Scenario: Get new listings with multiple invalid parameters
    And param page = getInvalidNewListingPage(1)
    And param limit = getInvalidNewListingLimit(1)
    And param created_on = getInvalidNewListingCreatedOn(0)
    When method get
    Then status 400

  @validation @cleanup
  Scenario: Validate no unwanted fields are present in new listings response
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, false, false)
    And match validationResult == true
    And def unwantedFieldsResult = validateNoUnwantedFields(response.data)
    And match unwantedFieldsResult == true

  @validation @cleanup
  Scenario: Validate no unwanted fields are present in new listings elements
    When method get
    Then status 200
    And def validationResult = validateNewListingSuccessResponse(response, false, false)
    And match validationResult == true
    And def unwantedFieldsResult = validateNoUnwantedFieldsInArray(response.data.elements)
    And match unwantedFieldsResult == true 