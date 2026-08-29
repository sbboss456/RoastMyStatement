const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const sIdx = js.indexOf('selectDynamicQuestions() {');
const eIdx = js.indexOf('// Pre-calculate theoretical limits');

const nStr = `selectDynamicQuestions() {
        if (!window.APP_DATA || !window.APP_DATA.getQuestionsForCountry) { console.error("No APP_DATA. Engine crash."); return; }

        let seen = [];
        try { seen = JSON.parse(localStorage.getItem('roast_seen_qs')) || []; } catch(e){}

        appState.activeQuizQuestions = window.APP_DATA.getQuestionsForCountry(appState.country, 15, seen);

        `;

js = js.substring(0, sIdx) + nStr + js.substring(eIdx);
fs.writeFileSync('js/app.js', js);
console.log('Force patched');
