const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const t = `const s = this.settings ? this.settings.settings : null;`;
const n = `const s = this.settings ? this.settings.settings : null;
        const edEl = document.getElementById('card-country-edition');
        if(edEl) edEl.textContent = (appState.country === 'NONE' ? 'GLOBAL' : window.APP_DATA.COUNTRIES[appState.country].name.toUpperCase()) + ' ED.';`;

js = js.replace(t, n);
fs.writeFileSync('js/app.js', js);
console.log('Card JS patched');
