const fs = require('fs');
let js = fs.readFileSync('js/data-engine.js', 'utf8');
js = js.replace(/\\n/g, '\n');
fs.writeFileSync('js/data-engine.js', js);
console.log('Fixed data-engine syntax');
