const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const targets = [
  "document.getElementById('finance-csv-msg')",
  "msg",
  "document.getElementById('finance-month-display')",
  "document.getElementById('kpi-income')",
  "document.getElementById('kpi-spent')",
  "document.getElementById('kpi-remaining')",
  "document.getElementById('kpi-rate')",
  "document.getElementById('live-chaos-score')",
  "liveC",
  "span",
  "this.progressText",
  "out",
  "document.getElementById('result-title')",
  "document.getElementById('result-desc')",
  "document.getElementById('header-main-score')",
  "nameEl",
  "document.getElementById('card-title')",
  "document.getElementById('card-desc')",
  "document.getElementById('card-main-score')",
  "document.getElementById('csv-stat-txns')",
  "document.getElementById('csv-stat-debits')",
  "document.getElementById('csv-stat-credits')",
  "this.csvSysMsg",
  "pt"
];

targets.forEach(t => {
  let escapedT = t.replace(/[-\/\\\\^$*+?.()|[\]{}]/g, '\\\\$&');
  
  let reg = new RegExp('(\\\\n\\\\s*)' + escapedT + '\\\\.textContent\\\\s*=', 'g');
  js = js.replace(reg, '\(' + t + ') ' + t + '.textContent =');
});

fs.writeFileSync('js/app.js', js);
console.log('Null Pointers Patched V2');
