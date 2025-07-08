package runners;

import com.intuit.karate.junit5.Karate;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import utils.DashboardGenerator;

public class DashboardTestRunner {
    
    @Test
    Karate testAll() {
        return Karate.run("classpath:features/tokens", "classpath:features/trade", "classpath:features/app", "classpath:features/common", "classpath:features/performance").relativeTo(getClass());
    }
    
    @AfterAll
    static void generateDashboard() {
        System.out.println("\n🔄 Generando dashboard automático después de las pruebas...");
        DashboardGenerator.generateDashboard();
        System.out.println("✅ Proceso completado. Dashboard disponible en: target/karate-reports/functional/complete/index.html");
    }
} 