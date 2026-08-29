const fs = require('fs');
const { JSDOM } = require("jsdom");
const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { url: "https://localhost/", pretendToBeVisual: true });
const window = dom.window;
global.window = window;
global.document = window.document;

// Mocks
window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
window.lucide = { createIcons: () => {} };
window.Capacitor = { getPlatform: () => 'android' };
window.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; }
};

try {
    eval(fs.readFileSync('js/data-engine.js', 'utf8'));
    eval(fs.readFileSync('js/app.js', 'utf8'));

    const ev = window.document.createEvent('Event');
    ev.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(ev);

    console.log('[QA] Onboarding State:', !!window.document.getElementById('view-onboarding'));
    
    // Skip onboarding
    const btnSkip = window.document.getElementById('btn-ob-skip');
    if(btnSkip) btnSkip.click();
    
    // Start Quiz
    const startBtn = window.document.getElementById('btn-start-quiz');
    if(startBtn) startBtn.click();
    
    console.log('[QA] Active View expected CountrySelect:', window.document.querySelector('.view:not(.hidden)')?.id);

    // Select Country
    window.app.selectCountry('US');
    const confirmC = window.document.getElementById('btn-confirm-country');
    if(confirmC) confirmC.click();

    console.log('[QA] Active View expected Quiz:', window.document.querySelector('.view:not(.hidden)')?.id);
    console.log('[QA] Loaded Question Count:', window.appState.activeQuizQuestions.length);

    // Answer exactly 15 questions
    for(let i=0; i<window.appState.activeQuizQuestions.length; i++) {
        const optionZero = window.document.querySelector('.quiz-option');
        if(optionZero) optionZero.click();
        else {
             // For test, trigger answer directly
             window.app.handleAnswer(0);
        }
    }

    console.log('[QA] Active View expected Analyzing:', window.document.querySelector('.view:not(.hidden)')?.id);
    
    // Since analyzing sets a timeout `appState.terminalTimeout` to show result, let's manually call `showDeterminedResult`
    window.app.showDeterminedResult();
    console.log('[QA] Active View expected Result:', window.document.querySelector('.view:not(.hidden)')?.id);
    
    console.log('[QA] Result Content:');
    console.log(' - Title:', window.document.getElementById('result-title')?.textContent);
    console.log(' - Strength:', window.document.getElementById('card-strength')?.textContent);
    console.log(' - Weakness:', window.document.getElementById('card-weakness')?.textContent);
    console.log(' - Roast Items:', window.document.getElementById('card-roast-text')?.innerHTML);

    let passed = true;
    if(window.appState.activeQuizQuestions.length !== 15) { console.log('❌ BUG: Question length != 15'); passed = false; }
    if(!window.document.getElementById('result-title')?.textContent) { console.log('❌ BUG: Result Title missing'); passed = false; }
    if(!window.document.getElementById('card-strength')?.textContent) { console.log('❌ BUG: Strength missing'); passed = false; }
    
    console.log(passed ? '✅ QA PASS: Core Flow Completed.' : '❌ QA FAIL.');

} catch(e) {
    console.log('[QA] Exception:', e);
}

