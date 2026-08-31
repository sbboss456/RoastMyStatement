const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

// Target the injection target logic
const t = `const target = document.getElementById('finance-empty-state').nextElementSibling; // Just before dashboard contents`;
const n = `const target = document.getElementById('view-finance').querySelector('.privacy-note'); // Just below the local-only banner
                if(!target) return;`;
                
js = js.replace(t, n);

// And change afterbegin to afterend
const t2 = `target.insertAdjacentHTML('afterbegin', html);`;
const n2 = `target.insertAdjacentHTML('afterend', html);`;
js = js.replace(t2, n2);

fs.writeFileSync('js/app.js', js);
console.log('Fixed preview positioning');
