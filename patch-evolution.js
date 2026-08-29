const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const anchor = `renderDailyDilemma() {`;

const inject = `renderEvolution() {
        const wrap = document.getElementById('evolution-content');
        if(!wrap) return;
        let hist = [];
        try { hist = JSON.parse(localStorage.getItem('roast_history')); } catch(e){}
        if (!hist || hist.length < 2) {
            wrap.innerHTML = '<p class="text-muted">Take the Personality Test a few times to track your Evolution over time.</p>';
            return;
        }

        const first = hist[0];
        const last = hist[hist.length - 1];

        const html = \`<div style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <div style="text-align:center;">
                    <span class="tech-mono text-muted text-xs">FIRST TEST</span><br>
                    <strong style="color:var(--accent-danger); font-size:1.2rem;">\${first.chaos}</strong>
                </div>
                <div>
                   <span class="tech-mono text-xs">-> CHAOS -></span>
                </div>
                <div style="text-align:center;">
                    <span class="tech-mono text-muted text-xs">LATEST TEST</span><br>
                    <strong style="\${last.chaos < first.chaos ? 'color:#00ff66;' : 'color:var(--accent-danger);'} font-size:1.2rem;">\${last.chaos}</strong>
                </div>
            </div>
            <div style="display:flex; justify-content:space-between;">
                <div style="text-align:center;">
                    <strong style="color:var(--accent-acid); font-size:1.2rem;">\${first.saving}</strong>
                </div>
                <div><span class="tech-mono text-xs">-> SAVING -></span></div>
                <div style="text-align:center;">
                    <strong style="\${last.saving > first.saving ? 'color:#00ff66;' : 'color:var(--accent-acid);'} font-size:1.2rem;">\${last.saving}</strong>
                </div>
            </div>
        \`;
        wrap.innerHTML = html;
    },
    
    `;

if (js.indexOf('renderEvolution()') === -1 && js.indexOf(anchor) > -1) {
    js = js.substring(0, js.indexOf(anchor)) + inject + js.substring(js.indexOf(anchor));
    
    // Mount it into the dashboard initializer
    js = js.replace('this.renderDailyDilemma();', 'this.renderDailyDilemma();\n        this.renderEvolution();');
    
    fs.writeFileSync('js/app.js', js);
    console.log('Evolution engine patched.');
} else {
    console.log('Evolution engine already patched or anchor missing.');
}
