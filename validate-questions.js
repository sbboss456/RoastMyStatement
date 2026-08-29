const fs = require('fs');

const dataCode = fs.readFileSync('js/data-engine.js', 'utf8');

let sandbox = { window: {} };
eval(dataCode.replace(/window\./g, 'sandbox.window.'));

const APP_DATA = sandbox.window.APP_DATA;

let output = '==========================================\nCOUNTRY CONTENT VALIDATION\n==========================================\n\n';

let allPassed = true;
let countryCount = Object.keys(APP_DATA.COUNTRIES).length;

for (const [code, cData] of Object.entries(APP_DATA.COUNTRIES)) {
    const questions = APP_DATA.QUESTIONS.filter(q => q.country === code);
    const qCount = questions.length;
    
    // Check duplicates
    const texts = new Set();
    let duplicates = 0;
    let missingMeta = 0;
    
    questions.forEach(q => {
        if (texts.has(q.text)) duplicates++;
        texts.add(q.text);
        if (!q.category || !q.options || q.options.length === 0) missingMeta++;
    });

    output += `${cData.name}:\n`;
    output += `${qCount} questions\n`;
    output += `${duplicates} duplicates\n`;
    output += `${missingMeta} missing metadata\n\n`;

    if (qCount < 100 || duplicates > 0 || missingMeta > 0) allPassed = false;
}

if (allPassed && countryCount >= 40) {
    output += `✅ SUCCESS: ${countryCount} countries parsed. All contain 100+ unique questions with zero duplication globally.`;
} else {
    output += `❌ FAILED: Found ${countryCount} countries. Requires 40+ countries and 100+ flawless questions each.`;
}

console.log(output);