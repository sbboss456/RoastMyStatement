const fs = require('fs');
let ht = fs.readFileSync('index.html', 'utf8');

ht = ht.replace(/>₹0</g, '>$0<');
ht = ht.replace(/\(₹\)/g, '(AMT)');

fs.writeFileSync('index.html', ht);
console.log('Fixed hardcoded currency symbols in UI');
