const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const targetStr = `if(window.ROAST_LIBRARY && window.ROAST_LIBRARY.generateMultiRoast) {
                 roasts = window.ROAST_LIBRARY.generateMultiRoast(foundPersonality.id, sTrait, wTrait);
            } else {
                 roasts = [foundPersonality.desc, "You are fundamentally reckless with capital.", "Your financial priorities require a hard reboot."];
            }`;

const replaceStr = `if(window.APP_DATA && window.APP_DATA.ROAST_ENGINE) {
                roasts = window.APP_DATA.ROAST_ENGINE.generateMultiRoast(appState.country, foundPersonality.id, wTrait, sTrait, appState.roastIntensity);
            } else {
                roasts = [foundPersonality.desc, "You are fundamentally reckless with capital.", "Your financial priorities require a hard reboot."];
            }`;

const sIdx = js.indexOf('let roasts = [];');
const eIdx = js.indexOf('console.log(\'[PERSONALITY] Roast 1 generated\');');

if(sIdx > -1 && eIdx > -1) {
    js = js.substring(0, sIdx) + 'let roasts = [];\n            ' + replaceStr + '\n\n            ' + js.substring(eIdx);
    fs.writeFileSync('js/app.js', js);
    console.log('Successfully patched generateMultiRoast logic.');
} else {
    console.log('Failed to find bounds for generateMultiRoast.');
}
