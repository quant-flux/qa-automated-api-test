package runners;

import com.intuit.karate.junit5.Karate;

public class FunctionalTestRunner {
    
    // ========================================
    // TESTS FUNCIONALES GENERALES
    // ========================================
    
    @Karate.Test
    Karate testAllFunctional() {
        return Karate.run("classpath:features/tokens", "classpath:features/trade", "classpath:features/app")
                .relativeTo(getClass())
                .tags("~@performance")  // Excluye tests de performance
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional");
    }
    
    @Karate.Test
    Karate testCompleteReport() {
        return Karate.run("classpath:features/tokens", "classpath:features/trade", "classpath:features/app")
                .relativeTo(getClass())
                .tags("~@performance")  // Excluye tests de performance
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/complete");
    }
    
    @Karate.Test
    Karate testSmokeTests() {
        return Karate.run("classpath:features/tokens", "classpath:features/trade", "classpath:features/app")
                .relativeTo(getClass())
                .tags("@smoke")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/smoke");
    }
    
    @Karate.Test
    Karate testPositiveScenarios() {
        return Karate.run("classpath:features/tokens", "classpath:features/trade", "classpath:features/app")
                .relativeTo(getClass())
                .tags("@positive")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/positive");
    }
    
    @Karate.Test
    Karate testNegativeScenarios() {
        return Karate.run("classpath:features/tokens", "classpath:features/trade", "classpath:features/app")
                .relativeTo(getClass())
                .tags("@negative")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/negative");
    }
    
    // ========================================
    // TESTS FUNCIONALES POR MÓDULO
    // ========================================
    
    @Karate.Test
    Karate testTokenFeatures() {
        return Karate.run("classpath:features/tokens")
                .relativeTo(getClass())
                .tags("~@performance")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/tokens");
    }
    
    @Karate.Test
    Karate testTradeFeatures() {
        return Karate.run("classpath:features/trade")
                .relativeTo(getClass())
                .tags("~@performance")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/trade");
    }
    
    @Karate.Test
    Karate testAppFeatures() {
        return Karate.run("classpath:features/app")
                .relativeTo(getClass())
                .tags("~@performance")
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/app");
    }
    
    // ========================================
    // TESTS FUNCIONALES ESPECÍFICOS
    // ========================================
    
    @Karate.Test
    Karate testTokenData() {
        return Karate.run("classpath:features/tokens/TokenData.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/token-data");
    }
    
    @Karate.Test
    Karate testTokenList() {
        return Karate.run("classpath:features/tokens/TokenList.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/token-list");
    }
    
    @Karate.Test
    Karate testTokenPrice() {
        return Karate.run("classpath:features/tokens/TokenPrice.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/token-price");
    }
    
    @Karate.Test
    Karate testTradeList() {
        return Karate.run("classpath:features/trade/TradeList.feature")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .reportDir("target/karate-reports/functional/trade-list");
    }
    

} 