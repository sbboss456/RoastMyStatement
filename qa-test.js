const fs = require('fs');
const { JSDOM } = require("jsdom");

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
    url: "https://localhost/",
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true
});

const window = dom.window;
global.window = window;
global.document = window.document;
global.localStorage = {
    store: {},
    getItem(key) { return this.store[key] || null; },
    setItem(key, value) { this.store[key] = String(value); },
    removeItem(key) { delete this.store[key]; }
};
global.navigator = { userAgent: 'node.js', canShare: false };
global.URL = { createObjectURL: () => 'blob:test', revokeObjectURL: () => {} };

// Mock lucide logic to prevent missing svgs crashing loop
window.lucide = { createIcons: () => {} };
window.Capacitor = { getPlatform: () => 'android' }; // Act like Native Android!

setTimeout(() => {
    try {
        console.log('[QA] Initializing data-engine...');
        eval(fs.readFileSync('js/data-engine.js', 'utf8'));
        
        console.log('[QA] Initializing app.js...');
        eval(fs.readFileSync('js/app.js', 'utf8'));

        console.log('[QA] Testing App Load...');
        setTimeout(() => {
            console.log('[QA] DOM Content Loaded triggered...');
            const ev = dom.window.document.createEvent('Event');
            ev.initEvent('DOMContentLoaded', true, true);
            dom.window.document.dispatchEvent(ev);

            // Test 1: Onboarding interaction
            console.log('[QA] Checking Onboarding Status...');
            const ob = dom.window.document.getElementById('view-onboarding');
            if(ob) {
                console.log('> Onboarding modal rendered successfully.');
            } else {
                console.log('> ERROR: Onboarding modal missing.');
            }

            // Test 2: Simulating "Skip" on onboarding
            console.log('[QA] Simulating Onboarding Skip...');
            const btnSkip = dom.window.document.getElementById('btn-ob-skip');
            if (btnSkip) {
                btnSkip.click();
            }

            // Test 3: Starting Quiz
            console.log('[QA] Simulating Start Quiz...');
            const startBtn = dom.window.document.getElementById('btn-start-quiz');
            if(startBtn) startBtn.click();
            
            // Should be on country select now because country == NONE
            console.log('[QA] Active View is:', dom.window.document.querySelector('.view.active')?.id || dom.window.document.querySelector('.view:not(.hidden)')?.id);

            // Test 4: Select Country and submit
            window.app.selectCountry('US');
            console.log('[QA] Country Selected: US');
            const confirmC = dom.window.document.getElementById('btn-confirm-country');
            if(confirmC) confirmC.click();

            console.log('[QA] Active View after Country Select:', dom.window.document.querySelector('.view.active')?.id || dom.window.document.querySelector('.view:not(.hidden)')?.id);
            
            // Check active Quiz Questions
            if(window.appState && window.appState.activeQuizQuestions) {
                console.log('[QA] Loaded questions for quiz:', window.appState.activeQuizQuestions.length);
            }

            // Finish
            console.log('[QA] Preliminary Load Success');
        }, 100);

    } catch(e) {
        console.error('[QA] CRITICAL CRASH:', e);
    }
}, 100);
