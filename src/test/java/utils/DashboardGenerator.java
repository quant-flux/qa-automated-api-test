package utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.*;
import java.nio.file.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class DashboardGenerator {
    
    private static final String DASHBOARD_TEMPLATE_PATH = "src/main/resources/index.html";
    private static final String REPORTS_DIR = "target/karate-reports/functional/complete/";
    private static final String KARATE_SUMMARY_FILE = "karate-summary-json.txt";
    
    public static void main(String[] args) {
        generateDashboard();
    }
    
    public static void generateDashboard() {
        try {
            System.out.println("🔄 Generando dashboard automático...");
            
            // Leer estadísticas actuales
            TestStats stats = calculateTestStats();
            
            // Generar dashboard con estadísticas actualizadas
            String dashboardContent = generateDashboardContent(stats);
            
            // Crear directorio si no existe
            Files.createDirectories(Paths.get(REPORTS_DIR));
            
            // Escribir dashboard
            Path dashboardPath = Paths.get(REPORTS_DIR, "index.html");
            Files.write(dashboardPath, dashboardContent.getBytes());
            
            // Copiar archivos JS
            copyJsFiles();
            
            System.out.println("✅ Dashboard generado exitosamente en: " + dashboardPath.toAbsolutePath());
            System.out.println("📊 Estadísticas: " + stats.totalTests + " tests, " + stats.passedTests + " exitosos");
            
        } catch (Exception e) {
            System.err.println("❌ Error generando dashboard: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    private static TestStats calculateTestStats() {
        TestStats stats = new TestStats();
        
        try {
            // Intentar leer karate-summary-json.txt
            Path summaryPath = Paths.get(REPORTS_DIR, KARATE_SUMMARY_FILE);
            if (Files.exists(summaryPath)) {
                String content = Files.readString(summaryPath);
                ObjectMapper mapper = new ObjectMapper();
                JsonNode root = mapper.readTree(content);
                
                if (root.has("functional")) {
                    JsonNode functional = root.get("functional");
                    stats.totalTests = functional.get("totalTests").asInt();
                    stats.passedTests = functional.get("passedTests").asInt();
                    stats.failedTests = functional.get("failedTests").asInt();
                    stats.successRate = functional.get("successRate").asDouble();
                }
            } else {
                // Calcular desde archivos JSON individuales
                calculateStatsFromJsonFiles(stats);
            }
        } catch (Exception e) {
            System.err.println("⚠️ Error leyendo estadísticas, usando valores por defecto: " + e.getMessage());
            // Valores por defecto
            stats.totalTests = 593;
            stats.passedTests = 0;
            stats.failedTests = 593;
            stats.successRate = 0.0;
        }
        
        return stats;
    }
    
    private static void calculateStatsFromJsonFiles(TestStats stats) {
        try {
            File reportsDir = new File(REPORTS_DIR);
            if (!reportsDir.exists()) return;
            
            File[] jsonFiles = reportsDir.listFiles((dir, name) -> name.endsWith(".json"));
            if (jsonFiles == null) return;
            
            ObjectMapper mapper = new ObjectMapper();
            
            for (File jsonFile : jsonFiles) {
                try {
                    JsonNode root = mapper.readTree(jsonFile);
                    if (root.isArray()) {
                        for (JsonNode feature : root) {
                            if (feature.has("elements")) {
                                for (JsonNode element : feature.get("elements")) {
                                    if ("scenario".equals(element.get("type").asText())) {
                                        stats.totalTests++;
                                        
                                        boolean scenarioPassed = true;
                                        if (element.has("steps")) {
                                            for (JsonNode step : element.get("steps")) {
                                                if (step.has("result")) {
                                                    String status = step.get("result").get("status").asText();
                                                    if ("failed".equals(status)) {
                                                        scenarioPassed = false;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        
                                        if (scenarioPassed) {
                                            stats.passedTests++;
                                        } else {
                                            stats.failedTests++;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (Exception e) {
                    System.err.println("⚠️ Error procesando " + jsonFile.getName() + ": " + e.getMessage());
                }
            }
            
            if (stats.totalTests > 0) {
                stats.successRate = Math.round((double) stats.passedTests / stats.totalTests * 100.0);
            }
            
        } catch (Exception e) {
            System.err.println("❌ Error calculando estadísticas: " + e.getMessage());
        }
    }
    
    private static String generateDashboardContent(TestStats stats) throws IOException {
        String template = Files.readString(Paths.get(DASHBOARD_TEMPLATE_PATH));
        
        // Reemplazar estadísticas
        template = template.replaceAll("id=\"functionalTotalTests\">\\d+", "id=\"functionalTotalTests\">" + stats.totalTests);
        template = template.replaceAll("id=\"functionalPassedTests\">\\d+", "id=\"functionalPassedTests\">" + stats.passedTests);
        template = template.replaceAll("id=\"functionalSuccessRate\">\\d+%", "id=\"functionalSuccessRate\">" + Math.round(stats.successRate) + "%");
        
        // Actualizar texto descriptivo
        template = template.replaceAll("\\d+ tests funcionales", stats.totalTests + " tests funcionales");
        
        // Actualizar timestamp
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss"));
        template = template.replaceAll("Reporte generado el: <span id=\"timestamp\">.*?</span>", 
                                     "Reporte generado el: <span id=\"timestamp\">" + timestamp + "</span>");
        
        return template;
    }
    
    private static void copyJsFiles() throws IOException {
        Path jsSourceDir = Paths.get("src/main/resources/js");
        Path jsTargetDir = Paths.get(REPORTS_DIR, "js");
        
        if (Files.exists(jsSourceDir)) {
            Files.createDirectories(jsTargetDir);
            Files.walk(jsSourceDir)
                .filter(Files::isRegularFile)
                .forEach(source -> {
                    try {
                        Path target = jsTargetDir.resolve(jsSourceDir.relativize(source));
                        Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
                    } catch (IOException e) {
                        System.err.println("❌ Error copiando " + source + ": " + e.getMessage());
                    }
                });
        }
    }
    
    public static class TestStats {
        public int totalTests = 0;
        public int passedTests = 0;
        public int failedTests = 0;
        public double successRate = 0.0;
    }
} 