// Performance Configuration for Karate Tests

function fn() {
  // Load performance test data from JSON file
  var performanceData = read('classpath:data/performance/performance-test-data.json');

  // Extract configurations from JSON
  var PERFORMANCE_THRESHOLDS = performanceData.performance_thresholds;
  var ENDPOINT_SPECIFIC_THRESHOLDS = performanceData.endpoint_specific_thresholds;
  var PERCENTILE_THRESHOLDS = performanceData.percentile_thresholds;
  var THROUGHPUT_TARGETS = performanceData.throughput_targets;
  var ERROR_RATE_THRESHOLDS = performanceData.error_rate_thresholds;
  var LOAD_CONFIGS = performanceData.load_configs;
  var STRESS_CONFIGS = performanceData.stress_configs;
  var TEST_SCENARIOS = performanceData.test_scenarios;
  var TEST_DATA = performanceData.test_data;

  // Performance metrics tracking
  var performanceMetrics = {
    responseTimes: [],
    errors: [],
    throughput: [],
    startTime: null,
    endTime: null
  };

  // Helper functions for performance validation
  function validateResponseTime(response, threshold) {
      var responseTime = response.responseTime;
      performanceMetrics.responseTimes.push(responseTime);
      
      if (responseTime > threshold) {
          throw new Error('Response time ' + responseTime + 'ms exceeds threshold ' + threshold + 'ms');
      }
      return true;
  }

  function validatePercentile(percentile, threshold) {
      if (performanceMetrics.responseTimes.length === 0) {
          return true; // No data to validate
      }
      
      var sortedTimes = performanceMetrics.responseTimes.slice().sort(function(a, b) { return a - b; });
      var index = Math.ceil((percentile / 100) * sortedTimes.length) - 1;
      var actualPercentile = sortedTimes[index];
      
      if (actualPercentile > threshold) {
          throw new Error('P' + percentile + ' response time ' + actualPercentile + 'ms exceeds threshold ' + threshold + 'ms');
      }
      return true;
  }

  function validateThroughput(requests, duration, minThroughput) {
      var actualThroughput = requests / (duration / 1000);
      performanceMetrics.throughput.push(actualThroughput);
      
      if (actualThroughput < minThroughput) {
          throw new Error('Throughput ' + actualThroughput.toFixed(2) + ' req/s is below minimum ' + minThroughput + ' req/s');
      }
      return true;
  }

  function validateErrorRate(totalRequests, errorRequests, maxErrorRate) {
      var actualErrorRate = (errorRequests / totalRequests) * 100;
      performanceMetrics.errors.push(actualErrorRate);
      
      if (actualErrorRate > maxErrorRate) {
          throw new Error('Error rate ' + actualErrorRate.toFixed(2) + '% exceeds maximum ' + maxErrorRate + '%');
      }
      return true;
  }

  function getEndpointThreshold(endpoint, scenarioType) {
      if (ENDPOINT_SPECIFIC_THRESHOLDS[endpoint] && ENDPOINT_SPECIFIC_THRESHOLDS[endpoint][scenarioType]) {
          var thresholdType = ENDPOINT_SPECIFIC_THRESHOLDS[endpoint][scenarioType];
          return PERFORMANCE_THRESHOLDS[thresholdType];
      }
      return null;
  }

  function getPercentileThreshold(percentile) {
      return PERCENTILE_THRESHOLDS[percentile];
  }

  function getThroughputTarget(endpoint) {
      return THROUGHPUT_TARGETS[endpoint];
  }

  function getErrorRateThreshold(scenarioType) {
      return ERROR_RATE_THRESHOLDS[scenarioType];
  }

  function getScenarioConfig(endpoint, scenarioType) {
      return TEST_SCENARIOS[endpoint][scenarioType];
  }

  function getTestData(dataType, key) {
      return TEST_DATA[dataType][key];
  }

  function getThreshold(thresholdType) {
      return PERFORMANCE_THRESHOLDS[thresholdType];
  }

  function startPerformanceTracking() {
      performanceMetrics.startTime = new Date().getTime();
      performanceMetrics.responseTimes = [];
      performanceMetrics.errors = [];
      performanceMetrics.throughput = [];
  }

  function endPerformanceTracking() {
      performanceMetrics.endTime = new Date().getTime();
      return performanceMetrics;
  }

  function getPerformanceSummary() {
      if (performanceMetrics.responseTimes.length === 0) {
          return { message: 'No performance data available' };
      }
      
      var sortedTimes = performanceMetrics.responseTimes.slice().sort(function(a, b) { return a - b; });
      var totalTime = performanceMetrics.endTime - performanceMetrics.startTime;
      
      return {
          totalRequests: performanceMetrics.responseTimes.length,
          totalDuration: totalTime,
          averageResponseTime: sortedTimes.reduce(function(a, b) { return a + b; }, 0) / sortedTimes.length,
          minResponseTime: sortedTimes[0],
          maxResponseTime: sortedTimes[sortedTimes.length - 1],
          p50: sortedTimes[Math.floor(sortedTimes.length * 0.5)],
          p90: sortedTimes[Math.floor(sortedTimes.length * 0.9)],
          p95: sortedTimes[Math.floor(sortedTimes.length * 0.95)],
          p99: sortedTimes[Math.floor(sortedTimes.length * 0.99)],
          averageThroughput: performanceMetrics.throughput.length > 0 ? 
              performanceMetrics.throughput.reduce(function(a, b) { return a + b; }, 0) / performanceMetrics.throughput.length : 0,
          averageErrorRate: performanceMetrics.errors.length > 0 ? 
              performanceMetrics.errors.reduce(function(a, b) { return a + b; }, 0) / performanceMetrics.errors.length : 0
      };
  }

  function validateScenarioPerformance(endpoint, scenarioType, response) {
      var scenario = getScenarioConfig(endpoint, scenarioType);
      if (!scenario) {
          throw new Error('Scenario configuration not found for ' + endpoint + ' - ' + scenarioType);
      }
      
      // Validate response time
      validateResponseTime(response, getThreshold(scenario.threshold));
      
      // Validate percentile if specified
      if (scenario.percentile_target) {
          validatePercentile(parseInt(scenario.percentile_target.substring(1)), getPercentileThreshold(scenario.percentile_target));
      }
      
      return true;
  }

  // Return configurations and helpers
  return {
      PERFORMANCE_THRESHOLDS: PERFORMANCE_THRESHOLDS,
      ENDPOINT_SPECIFIC_THRESHOLDS: ENDPOINT_SPECIFIC_THRESHOLDS,
      PERCENTILE_THRESHOLDS: PERCENTILE_THRESHOLDS,
      THROUGHPUT_TARGETS: THROUGHPUT_TARGETS,
      ERROR_RATE_THRESHOLDS: ERROR_RATE_THRESHOLDS,
      LOAD_CONFIGS: LOAD_CONFIGS,
      STRESS_CONFIGS: STRESS_CONFIGS,
      TEST_SCENARIOS: TEST_SCENARIOS,
      TEST_DATA: TEST_DATA,
      
      // Core validation functions
      validateResponseTime: validateResponseTime,
      validatePercentile: validatePercentile,
      validateThroughput: validateThroughput,
      validateErrorRate: validateErrorRate,
      validateScenarioPerformance: validateScenarioPerformance,
      
      // Configuration getters
      getEndpointThreshold: getEndpointThreshold,
      getPercentileThreshold: getPercentileThreshold,
      getThroughputTarget: getThroughputTarget,
      getErrorRateThreshold: getErrorRateThreshold,
      getScenarioConfig: getScenarioConfig,
      getTestData: getTestData,
      getThreshold: getThreshold,
      
      // Performance tracking
      startPerformanceTracking: startPerformanceTracking,
      endPerformanceTracking: endPerformanceTracking,
      getPerformanceSummary: getPerformanceSummary,
      
      // Metrics access
      getPerformanceMetrics: function() { return performanceMetrics; }
  };
} 