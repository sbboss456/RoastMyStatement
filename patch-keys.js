const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

// The original strings
const strScores = "scores: { saving: 0, chaos: 0, impulse: 0, food: 0, digital: 0, discipline: 0, risk: 0, lifestyle: 0, confidence: 0, future: 0 },";
const strMax = "maxAbsPossible: { saving: 0, chaos: 0, impulse: 0, food: 0, digital: 0, discipline: 0, risk: 0, lifestyle: 0, confidence: 0, future: 0 },";
const strMin = "minAbsPossible: { saving: 0, chaos: 0, impulse: 0, food: 0, digital: 0, discipline: 0, risk: 0, lifestyle: 0, confidence: 0, future: 0 },";

let newKeys = "{ saving:0, chaos:0, impulse:0, food:0, digital:0, discipline:0, risk:0, lifestyle:0, confidence:0, future:0, social:0, health:0, self_awareness:0 }";

js = js.replace(strScores, 'scores: ' + newKeys + ',');
js = js.replace(strMax, 'maxAbsPossible: ' + newKeys + ',');
js = js.replace(strMin, 'minAbsPossible: ' + newKeys + ',');

// Fix progressText counter for exactly 15 questions since it is fixed to length
js = js.replace('const qTotalStr = String(appState.activeQuizQuestions.length).padStart(2, \'0\');', 'const qTotalStr = "15";');

fs.writeFileSync('js/app.js', js);
console.log('Keys expanded');
