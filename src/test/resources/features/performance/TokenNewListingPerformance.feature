@performance
Feature: Token New Listing Performance Tests

  Background:
    * def newListingData = read('classpath:data/performance/new-listing.json')
    * url baseUrl + '/tokens/new-listing'

  @baseline
  Scenario: Baseline performance test for new listing endpoint
    Given request newListingData.baseline
    When method GET
    Then status 200

  @load
  Scenario: Load test for new listing endpoint
    Given request newListingData.load
    When method GET
    Then status 200

  @endurance
  Scenario: Endurance test for new listing endpoint
    Given request newListingData.endurance
    When method GET
    Then status 200 