const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(/app\.switchView\('country-select'\)/g, "app.switchView('countrySelect')");
fs.writeFileSync('index.html', html);
console.log('Fixed index.html view call');
