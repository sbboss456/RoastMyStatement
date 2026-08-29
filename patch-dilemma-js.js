const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const inject = `

    renderDailyDilemma() {
        const wrap = document.getElementById('daily-dilemma-content');
        if(!wrap) return;
        
        let state = JSON.parse(localStorage.getItem('roast_dilemma')) || {};
        const today = new Date().toISOString().split('T')[0];
        
        appState.country = localStorage.getItem('roast_country') || 'GLOBAL';

        if (state.date !== today || !state.qId) {
            // Pick a new dilemma for today safely
            let options = null;
            if(window.APP_DATA) {
                const pool = window.APP_DATA.getQuestionsForCountry(appState.country, 1);
                if(pool && pool.length > 0) {
                   options = pool[0];
                }
            }
            if(!options) { wrap.innerHTML = '<p class="text-muted">No dilemma available today.</p>'; return; }
            
            state = { date: today, qId: options.id, text: options.text, opts: options.options, answered: false };
            localStorage.setItem('roast_dilemma', JSON.stringify(state));
        }

        if (state.answered) {
            wrap.innerHTML = \`<p class="tech-mono text-muted">> DILEMMA COMPLETED FOR \${today}.</p><p class="mt-2" style="color:var(--accent-acid);">\${state.feedback || 'Your choice has been recorded.'}</p>\`;
        } else {
            let optsHtml = '';
            state.opts.forEach((o, i) => {
                optsHtml += \`<button class="action-button outline highlight-hover w-full mb-2" onclick="app.finance.answerDilemma(\${i})" style="text-align:left; font-size:0.85rem; padding:0.5rem 1rem;">\${o.text}</button>\`;
            });
            wrap.innerHTML = \`<p class="display-block mb-4" style="font-size:1.1rem; font-weight:600;">\${state.text}</p>\${optsHtml}\`;
        }
    },

    answerDilemma(idx) {
        let state = JSON.parse(localStorage.getItem('roast_dilemma'));
        if(!state) return;
        state.answered = true;
        const o = state.opts[idx];
        let feedback = "Neutral decision.";
        if(o.impact) {
            if(o.impact.saving > 0) feedback = "You chose the disciplined path.";
            if(o.impact.chaos > 0) feedback = "Chaos increases.";
            if(o.impact.impulse > 0) feedback = "Your impulse control is officially compromised.";
        }
        state.feedback = feedback;
        localStorage.setItem('roast_dilemma', JSON.stringify(state));
        this.renderDailyDilemma();
    },

`;

const sIdx = js.indexOf('openDashboard() {');
if(sIdx > -1) {
    js = js.substring(0, sIdx) + inject + js.substring(sIdx);
    js = js.replace('if(window.lucide) window.lucide.createIcons();', 'if(window.lucide) window.lucide.createIcons();\n        this.renderDailyDilemma();');
    fs.writeFileSync('js/app.js', js);
    console.log('Daily Dilemma code injected');
} else {
    console.log('Failed to find hook');
}
