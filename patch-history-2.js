const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const anchor = `console.log('[PERSONALITY] Result object created');`;
if (js.indexOf(anchor) > -1) {
    const inject = `
            // Generate History Tracking Log
            try {
                let hist = JSON.parse(localStorage.getItem('roast_history')) || [];
                hist.push({
                    date: new Date().toISOString().split('T')[0],
                    country: appState.country,
                    chaos: normalized.chaos || 50,
                    saving: normalized.saving || 50,
                    impulse: normalized.impulse || 50,
                    personaName: foundPersonality.name
                });
                localStorage.setItem('roast_history', JSON.stringify(hist));
            } catch(e) {}
`;
    js = js.replace(anchor, inject + '\n            ' + anchor);
    fs.writeFileSync('js/app.js', js);
    console.log('History engine patched securely.');
}
