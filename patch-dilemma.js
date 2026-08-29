const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sIdx = html.indexOf('<!-- KPI Cards -->');
const inject = `                
                <!-- Daily Money Dilemma -->
                <div class="glossy-panel p-4 mb-4" id="daily-dilemma-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="tech-label highlight-acid"><i data-lucide="zap" style="width:14px; display:inline-block; vertical-align:middle;"></i> DAILY DILEMMA</span>
                        <span class="tech-mono text-muted" style="font-size:0.7rem;" id="daily-dilemma-timer">REFRESHES IN 24H</span>
                    </div>
                    <div id="daily-dilemma-content" class="mt-2 text-left">
                        <!-- Rendered by JS -->
                    </div>
                </div>
`;

if (sIdx > -1) {
    html = html.substring(0, sIdx) + inject + html.substring(sIdx);
    fs.writeFileSync('index.html', html);
    console.log('Daily dilemma injected');
} else {
    console.log('failed');
}
