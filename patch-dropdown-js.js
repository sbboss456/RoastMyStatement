const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const t = `cd.value = appState.country === 'NONE' ? 'NONE SELECTED' : (window.APP_DATA.COUNTRIES[appState.country].name + ' (' + window.APP_DATA.COUNTRIES[appState.country].currency + ')');`;
const n = `cd.textContent = appState.country === 'NONE' ? 'NONE SELECTED' : (window.APP_DATA.COUNTRIES[appState.country].name + ' (' + window.APP_DATA.COUNTRIES[appState.country].currency + ')');`;

js = js.replace(t, n);
fs.writeFileSync('js/app.js', js);
console.log('app.js patched');
