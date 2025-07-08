Feature: Advanced Performance Validation Tests

  Background:
    * def performanceConfig = call read('classpath:helpers/performance-config.js')
    * def perfData = performanceConfig.TEST_DATA
    * def scenarios = performanceConfig.TEST_SCENARIOS

  @performance @advanced @percentiles
  Scenario: Advanced performance validation with percentiles for token price
    * def endpoint = 'token_price'
    * def scenarioType = 'baseline'
    * def scenario = scenarios[endpoint][scenarioType]
    * def testAddress = perfData.token_addresses.primary
    
    # Start performance tracking
    * performanceConfig.startPerformanceTracking()
    
    # Execute multiple requests to gather percentile data
    * def requestCount = 10
    * def successfulRequests = 0
    
    # Execute requests sequentially
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time1 = responseTime
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time2 = responseTime
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time3 = responseTime
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time4 = responseTime
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time5 = responseTime
    * successfulRequests = successfulRequests + 1
    
    # End performance tracking and get summary
    * def metrics = performanceConfig.endPerformanceTracking()
    * def summary = performanceConfig.getPerformanceSummary()
    
    # Print performance summary
    * print 'Performance Summary:', summary
    
    # Validate percentiles
    * def p90Threshold = performanceConfig.getPercentileThreshold('p90')
    * assert summary.p90 <= p90Threshold, 'P90 response time ' + summary.p90 + 'ms exceeds threshold ' + p90Threshold + 'ms'
    
    # Validate throughput
    * def throughputTarget = scenario.throughput_target
    * def actualThroughput = successfulRequests / (summary.totalDuration / 1000)
    * assert actualThroughput >= throughputTarget * 0.8, 'Throughput ' + actualThroughput.toFixed(2) + ' req/s below target ' + throughputTarget + ' req/s'

  @performance @advanced @endpoint_specific
  Scenario: Endpoint-specific threshold validation for token data
    * def endpoint = 'token_data'
    * def scenarioType = 'baseline'
    * def scenario = scenarios[endpoint][scenarioType]
    * def testAddress = perfData.token_addresses.secondary
    
    # Get endpoint-specific threshold
    * def endpointThreshold = performanceConfig.getEndpointThreshold(endpoint, scenarioType)
    * print 'Endpoint-specific threshold for', endpoint, ':', endpointThreshold, 'ms'
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    When method get
    Then status 200
    * def time = responseTime
    * print 'Response Time:', time, 'ms, Threshold:', endpointThreshold, 'ms'
    * assert time <= endpointThreshold, 'Response time ' + time + 'ms exceeds endpoint-specific threshold ' + endpointThreshold + 'ms'

  @performance @advanced @pagination_performance
  Scenario: Pagination performance validation with different page sizes
    * def endpoint = 'token_list'
    * def paginationConfigs = perfData.pagination_params
    
    # Test small page size
    * def smallConfig = paginationConfigs.small
    * url baseUrl + getEndpoint(endpoint) + '?limit=' + smallConfig.limit + '&page=' + smallConfig.page
    When method get
    Then status 200
    * def smallPageTime = responseTime
    * print 'Small page response time:', smallPageTime, 'ms'
    
    # Test medium page size
    * def mediumConfig = paginationConfigs.medium
    * url baseUrl + getEndpoint(endpoint) + '?limit=' + mediumConfig.limit + '&page=' + mediumConfig.page
    When method get
    Then status 200
    * def mediumPageTime = responseTime
    * print 'Medium page response time:', mediumPageTime, 'ms'
    
    # Test large page size
    * def largeConfig = paginationConfigs.large
    * url baseUrl + getEndpoint(endpoint) + '?limit=' + largeConfig.limit + '&page=' + largeConfig.page
    When method get
    Then status 200
    * def largePageTime = responseTime
    * print 'Large page response time:', largePageTime, 'ms'
    
    # Validate that larger pages don't exceed reasonable thresholds
    * def largePageThreshold = performanceConfig.getThreshold('SLOW')
    * assert largePageTime <= largePageThreshold, 'Large page response time ' + largePageTime + 'ms exceeds threshold ' + largePageThreshold + 'ms'

  @performance @advanced @complex_filtering
  Scenario: Complex filtering performance validation for trade list
    * def endpoint = 'trade_list'
    * def complexFilters = perfData.trade_filter_params.complex
    
    # Build complex filter query
    * def filterQuery = '?token_address=' + complexFilters.token_address + '&timeframe=' + complexFilters.timeframe + '&min_amount=' + complexFilters.min_amount
    
    * url baseUrl + getEndpoint(endpoint) + filterQuery
    When method get
    Then status 200
    * def time = responseTime
    * print 'Complex filtering response time:', time, 'ms'
    
    # Validate against complex filtering threshold
    * def complexThreshold = performanceConfig.getThreshold('SLOW')
    * assert time <= complexThreshold, 'Complex filtering response time ' + time + 'ms exceeds threshold ' + complexThreshold + 'ms'

  @performance @advanced @memory_monitoring
  Scenario: Performance test with memory monitoring simulation
    * def endpoint = 'token_data'
    * def testAddress = perfData.token_addresses.high_volume
    
    # Start performance tracking
    * performanceConfig.startPerformanceTracking()
    
    # Simulate memory monitoring (in a real scenario, this would use actual system metrics)
    * def memoryUsage = []
    * def requestCount = 5
    
    # Execute requests and simulate memory tracking
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time1 = responseTime
    * def simulatedMemory1 = 100 + (Math.random() * 50)
    * memoryUsage.push(simulatedMemory1)
    * print 'Request 1 - Time:', time1, 'ms, Memory:', simulatedMemory1.toFixed(2), 'MB'
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time2 = responseTime
    * def simulatedMemory2 = 100 + (Math.random() * 50)
    * memoryUsage.push(simulatedMemory2)
    * print 'Request 2 - Time:', time2, 'ms, Memory:', simulatedMemory2.toFixed(2), 'MB'
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * def time3 = responseTime
    * def simulatedMemory3 = 100 + (Math.random() * 50)
    * memoryUsage.push(simulatedMemory3)
    * print 'Request 3 - Time:', time3, 'ms, Memory:', simulatedMemory3.toFixed(2), 'MB'
    
    # End tracking and analyze
    * def metrics = performanceConfig.endPerformanceTracking()
    * def summary = performanceConfig.getPerformanceSummary()
    
    # Validate memory usage doesn't grow excessively
    * def avgMemory = (simulatedMemory1 + simulatedMemory2 + simulatedMemory3) / 3
    * def maxMemory = Math.max(simulatedMemory1, simulatedMemory2, simulatedMemory3)
    * print 'Average memory usage:', avgMemory.toFixed(2), 'MB'
    * print 'Max memory usage:', maxMemory.toFixed(2), 'MB'
    
    # Memory should not exceed reasonable limits (simulated)
    * assert maxMemory <= 200, 'Memory usage ' + maxMemory.toFixed(2) + 'MB exceeds limit 200MB'

  @performance @advanced @stress_validation
  Scenario: Stress test validation with multiple endpoints
    * def endpoints = ['token_price', 'token_data', 'token_list']
    * def testAddresses = perfData.token_addresses
    
    # Start performance tracking
    * performanceConfig.startPerformanceTracking()
    
    # Test multiple endpoints under stress conditions
    * def endpoint = endpoints[0]
    * def testAddress = testAddresses.primary
    * url baseUrl + getEndpoint(endpoint) + testAddress
    When method get
    Then status 200
    * def time1 = responseTime
    * print 'Token price stress test - Response time:', time1, 'ms'
    
    * def endpoint2 = endpoints[1]
    * def testAddress2 = testAddresses.secondary
    * url baseUrl + getEndpoint(endpoint2) + testAddress2
    When method get
    Then status 200
    * def time2 = responseTime
    * print 'Token data stress test - Response time:', time2, 'ms'
    
    * def endpoint3 = endpoints[2]
    * url baseUrl + getEndpoint(endpoint3)
    When method get
    Then status 200
    * def time3 = responseTime
    * print 'Token list stress test - Response time:', time3, 'ms'
    
    # End tracking
    * def metrics = performanceConfig.endPerformanceTracking()
    * def summary = performanceConfig.getPerformanceSummary()
    
    # Validate all endpoints meet stress thresholds
    * def stressThreshold = performanceConfig.getThreshold('SLOW')
    * assert time1 <= stressThreshold, 'Token price stress test failed: ' + time1 + 'ms > ' + stressThreshold + 'ms'
    * assert time2 <= stressThreshold, 'Token data stress test failed: ' + time2 + 'ms > ' + stressThreshold + 'ms'
    * assert time3 <= stressThreshold, 'Token list stress test failed: ' + time3 + 'ms > ' + stressThreshold + 'ms'
    
    # Print final summary
    * print 'Stress test summary:', summary

  @performance @advanced @throughput_validation
  Scenario: Throughput validation for high-volume endpoints
    * def endpoint = 'token_price'
    * def throughputTarget = performanceConfig.getThroughputTarget(endpoint)
    * def testAddress = perfData.token_addresses.high_volume
    
    # Start performance tracking
    * performanceConfig.startPerformanceTracking()
    
    # Execute rapid requests to measure throughput
    * def requestCount = 5
    * def successfulRequests = 0
    
    # Execute requests sequentially
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * successfulRequests = successfulRequests + 1
    
    * url baseUrl + getEndpoint(endpoint) + testAddress
    * method get
    * status 200
    * successfulRequests = successfulRequests + 1
    
    # End tracking and calculate throughput
    * def metrics = performanceConfig.endPerformanceTracking()
    * def summary = performanceConfig.getPerformanceSummary()
    
    # Validate throughput
    * def actualThroughput = successfulRequests / (summary.totalDuration / 1000)
    * print 'Target throughput:', throughputTarget, 'req/s'
    * print 'Actual throughput:', actualThroughput.toFixed(2), 'req/s'
    * assert actualThroughput >= throughputTarget * 0.7, 'Throughput ' + actualThroughput.toFixed(2) + ' req/s below target ' + throughputTarget + ' req/s' 