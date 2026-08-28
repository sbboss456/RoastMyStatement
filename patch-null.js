const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

js = js.replace(/heroSub\.textContent = /g, 'if(heroSub) heroSub.textContent = ');
js = js.replace(/btnSpan\.textContent = /g, 'if(btnSpan) btnSpan.textContent = ');
js = js.replace(/btn\.textContent = /g, 'if(btn) btn.textContent = ');
js = js.replace(/this\.csvErrorMsg\.textContent = /g, 'if(this.csvErrorMsg) this.csvErrorMsg.textContent = ');
js = js.replace(/this\.csvFileName\.textContent = /g, 'if(this.csvFileName) this.csvFileName.textContent = ');
js = js.replace(/document\.getElementById\('hero-subtitle-text'\)\.textContent = /g, 'if(document.getElementById(\'hero-subtitle-text\')) document.getElementById(\'hero-subtitle-text\').textContent = ');
js = js.replace(/document\.getElementById\('btn-start-span'\)\.textContent = /g, 'if(document.getElementById(\'btn-start-span\')) document.getElementById(\'btn-start-span\').textContent = ');

fs.writeFileSync('js/app.js', js);
console.log('Null Pointers Patched');
