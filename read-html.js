const fs = require('fs');
let ht = fs.readFileSync('index.html', 'utf8');
const s = ht.indexOf('finance-dashboard-content');
console.log(ht.substring(s, s+500));
