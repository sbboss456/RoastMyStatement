const fs = require('fs');
const { JSDOM } = require("jsdom");
const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { url: "https://localhost/", pretendToBeVisual: true });
const window = dom.window;

let store = {};
window.localStorage = {
    getItem(key) { return store[key] || null; },
    setItem(key, value) { store[key] = String(value); },
    removeItem(key) { delete store[key]; }
};
window.matchMedia = () => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} });
window.lucide = { createIcons: () => {} };
window.Capacitor = { getPlatform: () => 'android' };
window.IntersectionObserver = class { observe(){} unobserve(){} };

const scriptData = fs.readFileSync('js/data-engine.js', 'utf8');
const scriptApp = fs.readFileSync('js/app.js', 'utf8');

try {
    // Inject scripts directly into jsdom
    const s1 = window.document.createElement('script');
    s1.textContent = scriptData;
    window.document.body.appendChild(s1);

    const s2 = window.document.createElement('script');
    s2.textContent = scriptApp;
    window.document.body.appendChild(s2);

    const ev = window.document.createEvent('Event');
    ev.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(ev);

    console.log('[QA] Onboarding View Active:', window.document.getElementById('view-onboarding')?.classList.contains('active'));
    
    // Skip onboarding
    const btnSkip = window.document.getElementById('btn-ob-skip');
    if(btnSkip) btnSkip.click();
    
    console.log('[QA] Active View expected Home:', window.document.querySelector('.view:not(.hidden)')?.id);

    // Start Quiz
    const startBtn = window.document.getElementById('btn-start-quiz');
    if(startBtn) startBtn.click();
    
    console.log('[QA] Active View expected CountrySelect:', window.document.querySelector('.view:not(.hidden)')?.id);

    // Select Country
    window.app.selectCountry('US');
    const confirmC = window.document.getElementById('btn-confirm-country');
    if(confirmC) {
        confirmC.disabled = false; // Bypass DOM disabled attribute check
        confirmC.click();
    }

    console.log('[QA] Active View expected Quiz:', window.document.querySelector('.view:not(.hidden)')?.id);
    console.log('[QA] Loaded Question Count:', window.appState.activeQuizQuestions.length);

    // Answer exactly 15 questions
    for(let i=0; i<window.appState.activeQuizQuestions.length; i++) {
        window.app.handleAnswer(0);
    }

    console.log('[QA] Active View expected Analyzing:', window.document.querySelector('.view:not(.hidden)')?.id);
    
    // Simulate terminal finish
    window.app.showDeterminedResult();
    console.log('[QA] Active View expected Result:', window.document.querySelector('.view:not(.hidden)')?.id);
    
    console.log('--- RESULT OBJECT ---');
    console.log(' - Title:', window.document.getElementById('result-title')?.textContent);
    console.log(' - Strength:', window.document.getElementById('card-strength')?.textContent);
    console.log(' - Weakness:', window.document.getElementById('card-weakness')?.textContent);
    
    let roasts = window.document.getElementById('card-roast-text')?.innerHTML;
    console.log(' - Roasts:', roasts?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());

    // Test Finance Dashboard
    window.app.finance.openDashboard();
    console.log('[QA] Active View expected Finance:', window.document.querySelector('.view:not(.hidden)')?.id);

    let dilemmaText = window.document.getElementById('daily-dilemma-content')?.textContent;
    console.log(' - Dilemma rendered:', dilemmaText?.includes('Loading') ? 'No' : 'Yes');

} catch(e) {
    console.log('[QA] Exception:', e);
}
