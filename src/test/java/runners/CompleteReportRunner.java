package runners;

import com.intuit.karate.junit5.Karate;

public class CompleteReportRunner {
    
    @Karate.Test
    Karate generateFullReport() {
        return Karate.run("classpath:features")
                .relativeTo(getClass())
                .outputCucumberJson(true)
                .outputHtmlReport(true)
                .outputJunitXml(true);
    }
} 