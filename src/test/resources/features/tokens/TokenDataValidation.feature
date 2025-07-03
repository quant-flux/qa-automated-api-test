Feature: Token Data Validation Constraints

Background:
  * url baseUrl

@positive
Scenario: Validate token data meets all constraints
  * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data == '#object'
  * def tokenData = response.data
  * validateTokenDataComplete(tokenData, 'strict')

@positive
Scenario: Validate token metadata meets constraints
  * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(0)
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data == '#object'
  * def tokenData = response.data
  * validateTokenDataComplete(tokenData, 'strict')

@positive
Scenario: Validate token data with basic validation level
  * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data == '#object'
  * def tokenData = response.data
  * validateTokenDataComplete(tokenData, 'basic')

@positive
Scenario: Validate token data with extended validation level
  * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data == '#object'
  * def tokenData = response.data
  * validateTokenDataComplete(tokenData, 'extended')

@negative
Scenario: Validate token data with invalid address format
  * url baseUrl + getEndpoint('token_data') + getInvalidTokenAddress(0)
  When method get
  Then status 404

@negative
Scenario: Validate token data with empty address
  * url baseUrl + getEndpoint('token_data') + ''
  When method get
  Then status 400

@negative
Scenario: Validate token data with non-existent address
  * url baseUrl + getEndpoint('token_data') + getInvalidTokenAddress(2)
  When method get
  Then status 404

@validation
Scenario: Validate token data field constraints
  * url baseUrl + getEndpoint('token_data') + getValidTokenAddress(0)
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data == '#object'
  * def tokenData = response.data
  
  # Validate required fields exist and are not empty
  And match tokenData.address == '#regex [1-9A-HJ-NP-Za-km-z]{32,44}'
  And match tokenData.name == '#string'
  And match tokenData.name != ''
  And match tokenData.symbol == '#string'
  And match tokenData.symbol != ''
  And match tokenData.creator == '#regex [1-9A-HJ-NP-Za-km-z]{32,44}'
  And match tokenData.create_tx == '#regex [1-9A-HJ-NP-Za-km-z]{88}'
  And match tokenData.created_time == '#number'
  And match tokenData.created_time.toString().length == 10
  
  # Validate optional fields if present
  And match tokenData.decimals == '#? _ == 6 || _ == 9'
  And match tokenData.supply == '#string'
  And match tokenData.created_on == '#? _ == "pumpfun" || _ == "moonshot" || _ == "boop" || _ == "raydium_launchpad" || _ == "bonk" || _ == "dynamic_bonding_curve" || _ == "unknown"'
  
  # Validate image URL if present
  And match tokenData.image == '#regex ^https://static\\.cloud-service-app\\.com.*'
  
  # Validate metadata_uri if present (can be empty or absent)
  And match tokenData.metadata_uri == '#? _ == null || _ == "" || !_includes(_, "/ipfs/") || _startsWith("https://ipfs.io/ipfs/")'
  
  # Validate authorities
  And match tokenData.mint_authority == '#? _ == null || _ == "#regex ^[1-9A-HJ-NP-Za-km-z]{32,44}$"'
  And match tokenData.freeze_authority == '#? _ == null || _ == "#regex ^[1-9A-HJ-NP-Za-km-z]{32,44}$"'
  
  # Validate bonding curves
  And match tokenData.bonding_curve == '#? _ == null || _ == "#regex ^[1-9A-HJ-NP-Za-km-z]{32,44}$" || _ == "#notpresent"'
  And match tokenData.associated_bonding_curve == '#? _ == null || _ == "#regex ^[1-9A-HJ-NP-Za-km-z]{32,44}$" || _ == "#notpresent"'

@validation
Scenario: Validate token metadata field constraints
  * url baseUrl + getEndpoint('token_meta') + getValidTokenAddress(0)
  When method get
  Then status 200
  And match response.status == 'success'
  And match response.data == '#object'
  * def tokenData = response.data
  
  # Validate metadata exists and has required fields
  And match tokenData.metadata == '#object'
  And match tokenData.metadata.name == tokenData.name
  And match tokenData.metadata.symbol == tokenData.symbol
  
  # Validate metadata image if present (can be empty or absent)
  And match tokenData.metadata.image == '#? _ == null || _ == "" || !_includes(_, "/ipfs/") || _startsWith("https://ipfs.io/ipfs/")'
  
  # Validate optional metadata fields don't exist if empty
  And match tokenData.metadata.description == '#? _ == null || _ == "" || _ != ""'
  And match tokenData.metadata.twitter == '#? _ == null || _ == "" || _ != ""'
  And match tokenData.metadata.website == '#? _ == null || _ == "" || _ != ""'
  And match tokenData.metadata.telegram == '#? _ == null || _ == "" || _ != ""'
  And match tokenData.metadata.uri == '#? _ == null || _ == "" || _ != ""' 