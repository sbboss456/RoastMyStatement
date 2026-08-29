const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const t = html.indexOf('id="challenge-modal"');
console.log(html.substring(t-100, t+1500));
