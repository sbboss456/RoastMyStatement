const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const target = `            appState.pendingResult = {
                persona: foundPersonality,
                roasts: roasts,
                normalized: normalized,
                strengthStr: stStr,
                weaknessStr: wStr
            };
            console.log('[PERSONALITY] Result object created');`;

const inject = `            appState.pendingResult = {
                persona: foundPersonality,
                roasts: roasts,
                normalized: normalized,
                strengthStr: stStr,
                weaknessStr: wStr
            };
            
            // Generate History Tracking Log
            try {
                let hist = JSON.parse(localStorage.getItem('roast_history')) || [];
                hist.push({
                    date: new Date().toISOString().split('T')[0],
                    country: appState.country,
                    chaosScore: normalized.chaos || 50,
                    savingScore: normalized.saving || 50,
                    impulseScore: normalized.impulse || 50,
                    personaName: foundPersonality.name
                });
                localStorage.setItem('roast_history', JSON.stringify(hist));
            } catch(e) {}
            
            console.log('[PERSONALITY] Result object created & history logged');`;

if (js.indexOf(target) > -1) {
    js = js.replace(target, inject);
    fs.writeFileSync('js/app.js', js);
    console.log('History engine patched securely.');
} else {
    console.log('Target not found for history patch.');
}
