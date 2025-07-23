package runners;

import com.intuit.karate.junit5.Karate;

public class PerformanceTestRunner {
    
    // ========================================
    // TESTS DE PERFORMANCE GENERALES
    // ========================================
    
    @Karate.Test
    Karate testAllPerformance() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@performance")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance");
    }
    
    @Karate.Test
    Karate testLightPerformance() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@light")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/light-load");
    }
    
    @Karate.Test
    Karate testMediumPerformance() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@medium")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/medium-load");
    }
    
    @Karate.Test
    Karate testHeavyPerformance() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@heavy")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/heavy-load");
    }
    
    // ========================================
    // TESTS DE PERFORMANCE POR ENDPOINT
    // ========================================
    
    @Karate.Test
    Karate testTokenDataPerformance() {
        return Karate.run("classpath:features/performance/TokenDataPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/token-data");
    }
    
    @Karate.Test
    Karate testTokenDataPerformanceAdvanced() {
        return Karate.run("classpath:features/performance/TokenDataPerformanceAdvanced.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/token-data-advanced");
    }
    
    @Karate.Test
    Karate testTokenListPerformance() {
        return Karate.run("classpath:features/performance/TokenListPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/token-list");
    }
    
    @Karate.Test
    Karate testTokenPricePerformance() {
        return Karate.run("classpath:features/performance/TokenPricePerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/token-price");
    }
    
    @Karate.Test
    Karate testTokenPriceMultiPerformance() {
        return Karate.run("classpath:features/performance/TokenPriceMultiPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/token-price-multi");
    }
    
    @Karate.Test
    Karate testCriticalEndpointsPerformance() {
        return Karate.run("classpath:features/performance/CriticalEndpointsPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/critical-endpoints");
    }
    
    @Karate.Test
    Karate testHeavyLoadEndpointsPerformance() {
        return Karate.run("classpath:features/performance/HeavyLoadEndpointsPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/heavy-load-endpoints");
    }
    
    @Karate.Test
    Karate testBottleneckEndpointsPerformance() {
        return Karate.run("classpath:features/performance/BottleneckEndpointsPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/bottleneck-endpoints");
    }
    
    @Karate.Test
    Karate testHighLatencyEndpointsPerformance() {
        return Karate.run("classpath:features/performance/HighLatencyEndpointsPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/high-latency-endpoints");
    }
    
    @Karate.Test
    Karate testResourceIntensiveEndpointsPerformance() {
        return Karate.run("classpath:features/performance/ResourceIntensiveEndpointsPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/resource-intensive-endpoints");
    }
    
    @Karate.Test
    Karate testTradeListPerformance() {
        return Karate.run("classpath:features/performance/TradeListPerformance.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/trade-list");
    }
    
    @Karate.Test
    Karate testGlobalLoadTest() {
        return Karate.run("classpath:features/performance/GlobalLoadTest.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/global-load");
    }
    
    @Karate.Test
    Karate testAdvancedPerformanceValidation() {
        return Karate.run("classpath:features/performance/AdvancedPerformanceValidation.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/advanced-validation");
    }
    
    // ========================================
    // TESTS DE PERFORMANCE AGRUPADOS
    // ========================================
    
    @Karate.Test
    Karate generateBaselinePerformanceReport() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@baseline")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/baseline");
    }
    
    @Karate.Test
    Karate generateLoadPerformanceReport() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@load")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/load");
    }
    
    @Karate.Test
    Karate generateStressPerformanceReport() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@stress")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/stress");
    }
    
    @Karate.Test
    Karate generateEndurancePerformanceReport() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@endurance")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/endurance");
    }
    
    @Karate.Test
    Karate generateAdvancedPerformanceReport() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@advanced")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/advanced");
    }
    
    // ========================================
    // TESTS DE PERFORMANCE CONFIGURABLES
    // ========================================
    
    @Karate.Test
    Karate testCustomThreshold() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@custom-threshold")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/custom-threshold");
    }
    
    @Karate.Test
    Karate testHighLoad() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@high-load")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/high-load");
    }
    
    @Karate.Test
    Karate testStressLoad() {
        return Karate.run("classpath:features/performance")
                .relativeTo(getClass())
                .tags("@stress-load")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/performance/stress-load");
    }
} 