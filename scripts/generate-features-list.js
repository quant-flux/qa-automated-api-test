const fs = require('fs');
const path = require('path');

const reportsDir = 'target/karate-reports/functional/complete';
const outputFile = path.join(reportsDir, 'features-list.json');

function getFeatureName(file) {
  // Ejemplo: features.tokens.TokenList.html => TokenList
  const match = file.match(/features\.[^.]+\.(.+)\.html/);
  return match ? match[1] : file.replace('.html', '');
}

function getSummary(jsonPath) {
  if (!fs.existsSync(jsonPath)) return null;
  try {
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    return {
      scenarios: data.scenarios || 0,
      passed: data.passed || 0,
      failed: data.failed || 0,
      durationMillis: data.durationMillis || 0
    };
  } catch {
    return null;
  }
}

const features = fs.readdirSync(reportsDir)
  .filter(f => f.endsWith('.html') && f.startsWith('features.'))
  .map(f => {
    const base = f.replace('.html', '');
    const jsonFile = path.join(reportsDir, base + '.karate-json.txt');
    const summary = getSummary(jsonFile);
    return {
      name: getFeatureName(f),
      file: f,
      summary
    };
  });

fs.writeFileSync(outputFile, JSON.stringify(features, null, 2));
console.log(`Generado: ${outputFile}`); 