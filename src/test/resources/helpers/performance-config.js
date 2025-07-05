// Performance Configuration for Karate Tests

function fn() {
  // Load performance test data from JSON file
  var performanceData = read('classpath:data/performance/performance-test-data.json');

  // Extract configurations from JSON
  var PERFORMANCE_THRESHOLDS = performanceData.performance_thresholds;
  var LOAD_CONFIGS = performanceData.load_configs;
  var STRESS_CONFIGS = performanceData.stress_configs;
  var TEST_SCENARIOS = performanceData.test_scenarios;
  var TEST_DATA = performanceData.test_data;

  // Helper functions for performance validation
  function validateResponseTime(response, threshold) {
      var responseTime = response.responseTime;
      if (responseTime > threshold) {
          throw new Error('Response time ' + responseTime + 'ms exceeds threshold ' + threshold + 'ms');
      }
      return true;
  }

  function validateThroughput(requests, duration, minThroughput) {
      var actualThroughput = requests / (duration / 1000);
      if (actualThroughput < minThroughput) {
          throw new Error('Throughput ' + actualThroughput + ' req/s is below minimum ' + minThroughput + ' req/s');
      }
      return true;
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

  // Return configurations and helpers
  return {
      PERFORMANCE_THRESHOLDS: PERFORMANCE_THRESHOLDS,
      LOAD_CONFIGS: LOAD_CONFIGS,
      STRESS_CONFIGS: STRESS_CONFIGS,
      TEST_SCENARIOS: TEST_SCENARIOS,
      TEST_DATA: TEST_DATA,
      validateResponseTime: validateResponseTime,
      validateThroughput: validateThroughput,
      getScenarioConfig: getScenarioConfig,
      getTestData: getTestData,
      getThreshold: getThreshold
  };
} 