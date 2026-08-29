const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const sIdx = html.indexOf('<!-- Daily Money Dilemma -->');
const inject = `                <!-- Evolution Tracking -->
                <div class="glossy-panel p-4 mb-4" id="evolution-card">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="tech-label highlight-acid"><i data-lucide="activity" style="width:14px; display:inline-block; vertical-align:middle;"></i> PERSONALITY EVOLUTION</span>
                    </div>
                    <div id="evolution-content" class="mt-4">
                        <!-- Rendered by JS -->
                    </div>
                </div>
                
`;

if (sIdx > -1) {
    html = html.substring(0, sIdx) + inject + html.substring(sIdx);
    fs.writeFileSync('index.html', html);
    console.log('Evolution panel injected');
} else {
    console.log('failed');
}
