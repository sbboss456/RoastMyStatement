const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const t = `        if (appState.isChallenged) {
            document.getElementById('challenge-accepted-msg').classList.remove('hidden');
            document.getElementById('normal-diagnosis-msg').classList.add('hidden');
        }`;

const n = `        if (appState.isChallenged) {
            let msgEl = document.getElementById('challenge-accepted-msg');
            msgEl.classList.remove('hidden');
            document.getElementById('normal-diagnosis-msg').classList.add('hidden');
            
            if (appState.challengerScore !== undefined) {
               const myChaos = normalized.chaos || 50;
               const theirChaos = appState.challengerScore;
               let winner = myChaos < theirChaos ? 'YOU ARE MORE FINANCIALLY STABLE.' : (myChaos > theirChaos ? 'YOU ARE MORE CHAOTIC THAN THEM.' : 'YOU ARE BOTH EQUALLY RECKLESS.');
               msgEl.innerHTML = \`<span class="tech-label highlight-acid"><span class="blink">></span> COMPARISON COMPLETE</span>
               <p class="mt-2" style="font-size:0.9rem;">\${appState.challengerName || 'Your friend'} scored \${theirChaos}/100 Chaos.</p>
               <h3 class="mt-1" style="color:var(--accent-acid);">\${winner}</h3>\`;
            }
        }`;

js = js.replace(t, n);
fs.writeFileSync('js/app.js', js);
console.log('Result comparison added');
