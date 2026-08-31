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
    const s1 = window.document.createElement('script');
    s1.textContent = scriptData;
    window.document.body.appendChild(s1);

    const s2 = window.document.createElement('script');
    s2.textContent = scriptApp;
    window.document.body.appendChild(s2);

    const ev = window.document.createEvent('Event');
    ev.initEvent('DOMContentLoaded', true, true);
    window.document.dispatchEvent(ev);

    console.log('[QA] Boot complete.');

    if (window.AchievementManager) {
        console.log('[QA] AchievementManager Loaded Successfully.');
        console.log('[QA] Total DB Count:', window.AchievementManager.db.length);
        
        console.log('[QA] Calling evaluate...');
        window.appState.roastIntensity = 'BRUTAL';
        window.AchievementManager.evaluate();
        
        console.log('[QA] Unlocked Length:', window.AchievementManager.state.unlocked.length);
        console.log('[QA] Current XP:', window.AchievementManager.state.xp);
        
        console.log('[QA] Simulating dashboard render...');
        window.app.finance.openDashboard();
        
        const previewHTML = window.document.getElementById('finance-ach-preview');
        if(previewHTML) {
             console.log('[QA] Preview Component successfully rendered inside HTML tree!');
        } else {
             console.log('❌ BUG: Preview was missing!');
        }
    } else {
        console.log('❌ BUG: Achievement Manager entirely missing!');
    }

} catch(e) {
    console.log('[QA] Crash:', e);
}
