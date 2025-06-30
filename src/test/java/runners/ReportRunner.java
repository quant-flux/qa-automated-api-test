package runners;

import com.intuit.karate.junit5.Karate;

public class ReportRunner {
    
    @Karate.Test
    Karate generateCompleteReport() {
        return Karate.run("classpath:features")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .tags("~@ignore", "~@api-bug");
    }
    
    @Karate.Test
    Karate testWithKnownBugs() {
        return Karate.run("classpath:features")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .tags("@api-bug");
    }
} 