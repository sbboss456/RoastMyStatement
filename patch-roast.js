const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const targetStr = `            if(window.ROAST_LIBRARY && window.ROAST_LIBRARY.generateMultiRoast) {
                 roasts = window.ROAST_LIBRARY.generateMultiRoast(foundPersonality.id, sTrait, wTrait);
            } else {
                 roasts = [foundPersonality.desc, "You are fundamentally reckless with capital.", "Your financial priorities require a hard reboot."];
            }`;

const replacementStr = `            if(window.APP_DATA && window.APP_DATA.ROAST_ENGINE) {
                roasts = window.APP_DATA.ROAST_ENGINE.generateMultiRoast(appState.country, foundPersonality.id, wTrait, sTrait, appState.roastIntensity);
            } else {
                roasts = [foundPersonality.desc, "You are fundamentally reckless with capital.", "Your financial priorities require a hard reboot."];
            }`;

js = js.replace(targetStr, replacementStr);
fs.writeFileSync('js/app.js', js);
console.log('Roast engine integrated');
