const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const perIdx = js.indexOf('const PERSONALITIES = [');
if (perIdx > -1) {
    const header = `/**
 * ROAST MY STATEMENT - FRONTEND APP
 * Financial Personality Engine + Viral Loop (GLOBAL 3.0)
 */

`;
    js = header + js.substring(perIdx);
    fs.writeFileSync('js/app.js', js);
    console.log('Fixed header');
} else {
    console.log('PERSONALITIES not found');
}
