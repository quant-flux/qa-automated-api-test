package runners;

import com.intuit.karate.junit5.Karate;

public class TokensEndpointsRunner {
    
    @Karate.Test
    Karate testAllFeatures() {
        return Karate.run("classpath:features")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true);
    }
    
    @Karate.Test
    Karate testTokenList() {
        return Karate.run("classpath:features/tokens/TokenList.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTokenMeta() {
        return Karate.run("classpath:features/tokens/TokenMeta.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTokenData() {
        return Karate.run("classpath:features/tokens/TokenData.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTokenPrice() {
        return Karate.run("classpath:features/tokens/TokenPrice.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTokenPricesMulti() {
        return Karate.run("classpath:features/tokens/TokenPricesMulti.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTokenPrices() {
        return Karate.run("classpath:features/tokens/TokenPrices.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTokenHolders() {
        return Karate.run("classpath:features/tokens/TokenHolders.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTradeOHLCV() {
        return Karate.run("classpath:features/trade/TradeOHLCV.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testTradeList() {
        return Karate.run("classpath:features/trade/TradeList.feature")
                .relativeTo(getClass());
    }
    
    @Karate.Test
    Karate testHealthCheck() {
        return Karate.run("classpath:features/app/HealthCheck.feature")
                .relativeTo(getClass());
    }
}
