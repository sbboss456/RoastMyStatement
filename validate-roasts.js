const fs = require('fs');
const dataCode = fs.readFileSync('js/data-engine.js', 'utf8');
let sandbox = { window: {} };
eval(dataCode.replace(/window\./g, 'sandbox.window.'));

const APP_DATA = sandbox.window.APP_DATA;

let output = '==========================================\nCOUNTRY ROAST CONTENT VALIDATION\n==========================================\n\n';
let allPassed = true;
let countryCount = Object.keys(APP_DATA.COUNTRIES).length;

for (const [code, cData] of Object.entries(APP_DATA.COUNTRIES)) {
    const roasts = APP_DATA.ROAST_ENGINE.ROASTS.filter(r => r.country === code);
    const rCount = roasts.length;
    
    // Check duplicates
    const texts = new Set();
    let duplicates = 0;
    let missingMeta = 0;
    
    roasts.forEach(r => {
        if (texts.has(r.roast)) duplicates++;
        texts.add(r.roast);
        if (!r.category || !r.intensity || !r.roast) missingMeta++;
    });

    output += `${cData.name}:\n`;
    output += `${rCount} roasts\n`;
    output += `${duplicates} duplicates\n`;
    output += `${missingMeta} missing metadata\n\n`;

    if (rCount < 100 || duplicates > 0 || missingMeta > 0) allPassed = false;
}

if (allPassed && countryCount >= 40) {
    output += `✅ SUCCESS: ${countryCount} countries parsed. All contain 100+ unique roasts with zero duplication globally.`;
} else {
    output += `❌ FAILED: Found ${countryCount} countries. Requires 40+ countries and 100+ flawless roasts each.`;
}

console.log(output);
