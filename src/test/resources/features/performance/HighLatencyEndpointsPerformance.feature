Feature: High Latency Endpoints Performance Tests

  Background:
    * def performanceConfig = call read('classpath:helpers/performance-config.js')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS

  @performance @high_latency @external_apis
  Scenario: High latency external API calls - Network delays
    * def threshold = 10000  # Umbral para latencia alta por APIs externas
    * def tokenAddress = perfData.token_addresses.primary
    
    # Test endpoints that might call external APIs (high latency)
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'High Latency External API (Token Price) - Response Time:', time, 'ms'
    * assert time < threshold, 'High latency external API took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#object'

  @performance @high_latency @database_latency
  Scenario: High latency database operations - Slow queries
    * def threshold = 12000  # Umbral para latencia alta de base de datos
    
    # Test database operations that might be slow
    * url baseUrl + getEndpoint('token_data') + perfData.token_addresses.primary
    When method get
    Then status 200
    * def time = responseTime
    * print 'High Latency Database (Token Data) - Response Time:', time, 'ms'
    * assert time < threshold, 'High latency database operation took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#object'

  @performance @high_latency @cache_miss
  Scenario: High latency cache miss scenarios - Cold start
    * def threshold = 15000  # Umbral para cache miss
    
    # Test scenarios that might cause cache misses
    * url baseUrl + getEndpoint('token_trending')
    And param time_period = '1h'  # Período específico que podría no estar cacheado
    When method get
    Then status 200
    * def time = responseTime
    * print 'High Latency Cache Miss (Trending 1h) - Response Time:', time, 'ms'
    * assert time < threshold, 'High latency cache miss took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @high_latency @network_delays
  Scenario: High latency network delays - Slow network conditions
    * def threshold = 8000  # Umbral para delays de red
    
    # Test network delay scenarios
    * url baseUrl + getEndpoint('trade_list') + perfData.token_addresses.primary
    When method get
    Then status 200
    * def time = responseTime
    * print 'High Latency Network Delay (Trade List) - Response Time:', time, 'ms'
    * assert time < threshold, 'High latency network delay took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array'

  @performance @high_latency @geographic_latency
  Scenario: High latency geographic distribution - Cross-region calls
    * def threshold = 12000  # Umbral para latencia geográfica
    
    # Test endpoints that might have geographic latency
    * url baseUrl + getEndpoint('token_list')
    When method get
    Then status 200
    * def time = responseTime
    * print 'High Latency Geographic (Token List) - Response Time:', time, 'ms'
    * assert time < threshold, 'High latency geographic took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data.elements == '#array'

  @performance @high_latency @latency_analysis
  Scenario: Latency analysis - Identify high latency patterns
    * def threshold = 15000  # Umbral para análisis de latencia
    * def tokenAddress = perfData.token_addresses.primary
    
    # Test multiple endpoints to analyze latency patterns
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time1 = responseTime
    * print 'Latency Analysis 1 (Token Price) - Response Time:', time1, 'ms'
    
    * url baseUrl + getEndpoint('token_data') + tokenAddress
    When method get
    Then status 200
    * def time2 = responseTime
    * print 'Latency Analysis 2 (Token Data) - Response Time:', time2, 'ms'
    
    * url baseUrl + getEndpoint('trade_list') + tokenAddress
    When method get
    Then status 200
    * def time3 = responseTime
    * print 'Latency Analysis 3 (Trade List) - Response Time:', time3, 'ms'
    
    # Analyze latency patterns
    * def avgLatency = (time1 + time2 + time3) / 3
    * def maxLatency = Math.max(time1, time2, time3)
    * def minLatency = Math.min(time1, time2, time3)
    * def latencyVariance = maxLatency - minLatency
    
    * print 'Latency Analysis:'
    * print '  - Token Price: ' + time1 + 'ms'
    * print '  - Token Data: ' + time2 + 'ms'
    * print '  - Trade List: ' + time3 + 'ms'
    * print '  - Average Latency: ' + avgLatency + 'ms'
    * print '  - Max Latency: ' + maxLatency + 'ms'
    * print '  - Min Latency: ' + minLatency + 'ms'
    * print '  - Latency Variance: ' + latencyVariance + 'ms'
    
    # Validate all latencies are within threshold
    * assert time1 < threshold, 'Latency analysis token price failed: ' + time1 + 'ms'
    * assert time2 < threshold, 'Latency analysis token data failed: ' + time2 + 'ms'
    * assert time3 < threshold, 'Latency analysis trade list failed: ' + time3 + 'ms'
    
    # Flag if latency variance is too high (inconsistent performance)
    * assert latencyVariance < 8000, 'High latency variance detected: ' + latencyVariance + 'ms indicates inconsistent performance'

  @performance @high_latency @latency_degradation
  Scenario: Latency degradation detection - Monitor latency trends
    * def threshold = 12000  # Umbral para degradación de latencia
    * def tokenAddress = perfData.token_addresses.primary
    
    # Test latency degradation over multiple requests
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time1 = responseTime
    * print 'Latency Degradation 1 - Response Time:', time1, 'ms'
    
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time2 = responseTime
    * print 'Latency Degradation 2 - Response Time:', time2, 'ms'
    
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time3 = responseTime
    * print 'Latency Degradation 3 - Response Time:', time3, 'ms'
    
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time4 = responseTime
    * print 'Latency Degradation 4 - Response Time:', time4, 'ms'
    
    * url baseUrl + getEndpoint('token_price') + tokenAddress
    When method get
    Then status 200
    * def time5 = responseTime
    * print 'Latency Degradation 5 - Response Time:', time5, 'ms'
    
    # Check for latency degradation pattern
    * def latencyIncrease = time5 - time1
    * def avgLatency = (time1 + time2 + time3 + time4 + time5) / 5
    
    * print 'Latency Degradation Analysis:'
    * print '  - First Request: ' + time1 + 'ms'
    * print '  - Last Request: ' + time5 + 'ms'
    * print '  - Latency Increase: ' + latencyIncrease + 'ms'
    * print '  - Average Latency: ' + avgLatency + 'ms'
    
    # Validate no excessive latency degradation
    * assert time1 < threshold, 'Latency degradation test 1 failed: ' + time1 + 'ms'
    * assert time5 < threshold, 'Latency degradation test 5 failed: ' + time5 + 'ms'
    * assert latencyIncrease < 5000, 'Significant latency degradation detected: increase of ' + latencyIncrease + 'ms'

  @performance @high_latency @timeout_scenarios
  Scenario: High latency timeout scenarios - Near timeout conditions
    * def threshold = 25000  # Umbral cercano al timeout
    * def tokenAddress = perfData.token_addresses.primary
    
    # Test scenarios that might approach timeout
    * url baseUrl + getEndpoint('trade_ohlcv') + tokenAddress
    And param time_range = '1y'
    And param interval = '1m'
    When method get
    Then status 200
    * def time = responseTime
    * print 'High Latency Timeout Scenario (OHLCV 1y) - Response Time:', time, 'ms'
    * assert time < threshold, 'High latency timeout scenario took ' + time + 'ms, exceeds threshold ' + threshold + 'ms'
    And match response.data == '#array' 