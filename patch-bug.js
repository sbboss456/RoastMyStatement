const fs = require('fs');
let js = fs.readFileSync('build-r-engine.js', 'utf8');

js = js.replace('r.roast === str && r.country === code && r.intensity === intensity', 'r.roast === str && r.country === code');
fs.writeFileSync('build-r-engine.js', js);
console.log('Fixed duplication bug scope');
