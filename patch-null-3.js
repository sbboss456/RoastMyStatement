const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const replacements = [
  ['document.getElementById(\'finance-csv-msg\').textContent =', 'if(document.getElementById(\'finance-csv-msg\')) document.getElementById(\'finance-csv-msg\').textContent ='],
  ['msg.textContent =', 'if(msg) msg.textContent ='],
  ['document.getElementById(\'finance-month-display\').textContent =', 'if(document.getElementById(\'finance-month-display\')) document.getElementById(\'finance-month-display\').textContent ='],
  ['document.getElementById(\'kpi-income\').textContent =', 'if(document.getElementById(\'kpi-income\')) document.getElementById(\'kpi-income\').textContent ='],
  ['document.getElementById(\'kpi-spent\').textContent =', 'if(document.getElementById(\'kpi-spent\')) document.getElementById(\'kpi-spent\').textContent ='],
  ['document.getElementById(\'kpi-remaining\').textContent =', 'if(document.getElementById(\'kpi-remaining\')) document.getElementById(\'kpi-remaining\').textContent ='],
  ['document.getElementById(\'kpi-rate\').textContent =', 'if(document.getElementById(\'kpi-rate\')) document.getElementById(\'kpi-rate\').textContent ='],
  ['document.getElementById(\'live-chaos-score\').textContent =', 'if(document.getElementById(\'live-chaos-score\')) document.getElementById(\'live-chaos-score\').textContent ='],
  ['liveC.textContent =', 'if(liveC) liveC.textContent ='],
  ['span.textContent =', 'if(span) span.textContent ='],
  ['this.progressText.textContent =', 'if(this.progressText) this.progressText.textContent ='],
  ['document.getElementById(\'result-title\').textContent =', 'if(document.getElementById(\'result-title\')) document.getElementById(\'result-title\').textContent ='],
  ['document.getElementById(\'result-desc\').textContent =', 'if(document.getElementById(\'result-desc\')) document.getElementById(\'result-desc\').textContent ='],
  ['document.getElementById(\'header-main-score\').textContent =', 'if(document.getElementById(\'header-main-score\')) document.getElementById(\'header-main-score\').textContent ='],
  ['nameEl.textContent =', 'if(nameEl) nameEl.textContent ='],
  ['document.getElementById(\'card-title\').textContent =', 'if(document.getElementById(\'card-title\')) document.getElementById(\'card-title\').textContent ='],
  ['document.getElementById(\'card-desc\').textContent =', 'if(document.getElementById(\'card-desc\')) document.getElementById(\'card-desc\').textContent ='],
  ['document.getElementById(\'card-main-score\').textContent =', 'if(document.getElementById(\'card-main-score\')) document.getElementById(\'card-main-score\').textContent ='],
  ['document.getElementById(\'csv-stat-txns\').textContent =', 'if(document.getElementById(\'csv-stat-txns\')) document.getElementById(\'csv-stat-txns\').textContent ='],
  ['document.getElementById(\'csv-stat-debits\').textContent =', 'if(document.getElementById(\'csv-stat-debits\')) document.getElementById(\'csv-stat-debits\').textContent ='],
  ['document.getElementById(\'csv-stat-credits\').textContent =', 'if(document.getElementById(\'csv-stat-credits\')) document.getElementById(\'csv-stat-credits\').textContent ='],
  ['this.csvSysMsg.textContent =', 'if(this.csvSysMsg) this.csvSysMsg.textContent ='],
  ['pt.textContent =', 'if(pt) pt.textContent =']
];

for(let r of replacements) {
  // Use split/join to replace all occurrences literally
  js = js.split(r[0]).join(r[1]);
}

fs.writeFileSync('js/app.js', js);
console.log('Null Pointers Patched V3');
