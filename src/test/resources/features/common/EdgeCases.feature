Feature: Edge Cases Validation Helper

Background:
  * def edgeCases = read('classpath:data/tokens/token-addresses.json').edgeCases

Scenario: Validate edge cases for <endpoint>
  * def endpoint = __arg ? __arg.endpoint : 'token/data'
  * def baseUrl = __arg ? __arg.baseUrl : 'https://full-api.cloud-service-app.com'
  
  * print 'Debug - endpoint:', endpoint
  * print 'Debug - baseUrl:', baseUrl
  
  * def case1 = edgeCases[0]
  * def encodedAddress1 = encodeURIComponent(case1.address)
  * url baseUrl + '/' + endpoint + '/' + encodedAddress1
  When method get
  Then status 400
  
  * def case2 = edgeCases[1]
  * def encodedAddress2 = encodeURIComponent(case2.address)
  * url baseUrl + '/' + endpoint + '/' + encodedAddress2
  When method get
  Then status 400
  
  * def case3 = edgeCases[2]
  * def encodedAddress3 = encodeURIComponent(case3.address)
  * url baseUrl + '/' + endpoint + '/' + encodedAddress3
  When method get
  Then status 400
  
  * def case4 = edgeCases[3]
  * def encodedAddress4 = encodeURIComponent(case4.address)
  * url baseUrl + '/' + endpoint + '/' + encodedAddress4
  When method get
  Then status 400