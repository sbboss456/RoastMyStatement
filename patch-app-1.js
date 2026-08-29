const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');
const stateStart = js.indexOf('const appState = {');

const newHeader = `/**
 * ROAST MY STATEMENT - FRONTEND APP
 * Financial Personality Engine + Viral Loop (GLOBAL 3.0)
 */

const PERSONALITIES = [
    { id: "boss", name: "THE FINANCIAL BOSS", icon: "award", desc: "You have terrifyingly good control over your money.", condition: (scores) => scores.saving > 40 && scores.chaos < 30 },
    { id: "foodie", name: "THE FOODIE MENACE", icon: "pizza", desc: "80% of your income is converted directly into calories.", condition: (scores) => scores.food > 30 },
    { id: "goblin", name: "THE DIGITAL GOBLIN", icon: "gamepad-2", desc: "You buy pixels instead of physical possessions.", condition: (scores) => scores.digital > 25 },
    { id: "impulse", name: "THE IMPULSE BUYER", icon: "shopping-bag", desc: "You see it. You like it. You buy it. You regret it.", condition: (scores) => scores.impulse > 40 },
    { id: "menace", name: "THE FINANCIAL MENACE", icon: "flame", desc: "You don't spend money. You release it into the wild.", condition: (scores) => scores.chaos > 45 || (scores.chaos > 30 && scores.impulse > 30) },
    { id: "optimist", name: "THE BLIND OPTIMIST", icon: "sun", desc: "You just assume money will appear when you need it.", condition: (scores) => scores.risk > 40 && scores.chaos > 20 },
    { id: "default", name: "THE AVERAGE SURVIVOR", icon: "circle-dashed", desc: "You are financially floating. Neither rich nor broke.", condition: () => true }
];

`;

js = newHeader + js.substring(stateStart);
fs.writeFileSync('js/app.js', js);
console.log('Stripped old questions');
