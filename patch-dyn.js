const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const tOld = `selectDynamicQuestions() {
        const fullBank = window.QUESTION_BANK || [];
        if (fullBank.length === 0) return;

        let seen = [];
        try { seen = JSON.parse(localStorage.getItem('roast_seen_qs')) || []; } catch(e){}

        // Filter unseen, fallback to full bank if running low
        let available = fullBank.filter(q => !seen.includes(q.id));
        if (available.length < 15) {
            seen = []; 
            available = [...fullBank]; 
        }

        // Shuffle
        available = available.sort(() => 0.5 - Math.random());
        appState.activeQuizQuestions = available.slice(0, 15);`;

const tNew = `selectDynamicQuestions() {
        if (!window.APP_DATA || !window.APP_DATA.getQuestionsForCountry) { console.error("No APP_DATA. Engine crash."); return; }

        let seen = [];
        try { seen = JSON.parse(localStorage.getItem('roast_seen_qs')) || []; } catch(e){}

        appState.activeQuizQuestions = window.APP_DATA.getQuestionsForCountry(appState.country, 15, seen);
`;

const repIdx = js.indexOf('selectDynamicQuestions() {');
if(repIdx > -1) {
    js = js.replace(tOld, tNew);
    fs.writeFileSync('js/app.js', js);
    console.log('selectDynamicQuestions patched');
} else {
    console.log('Not found');
}
