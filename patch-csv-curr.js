const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const t = `if(document.getElementById('csv-stat-debits')) document.getElementById('csv-stat-debits').textContent = totalDebits.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
        if(document.getElementById('csv-stat-credits')) document.getElementById('csv-stat-credits').textContent = totalCredits.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });`;

const n = `if(document.getElementById('csv-stat-debits')) document.getElementById('csv-stat-debits').textContent = this.finance ? this.finance.formatCurrency(totalDebits) : totalDebits;
        if(document.getElementById('csv-stat-credits')) document.getElementById('csv-stat-credits').textContent = this.finance ? this.finance.formatCurrency(totalCredits) : totalCredits;`;

js = js.replace(t, n);
fs.writeFileSync('js/app.js', js);
console.log('Fixed CSV Results currency formatter');
