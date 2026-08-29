const fs = require('fs');
let ht = fs.readFileSync('index.html', 'utf8');

const t = `<div class="card-brand">
                                <i data-lucide="asterisk" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> ROAST MY STATEMENT
                            </div>`;

const n = `<div class="card-brand" style="display:flex; justify-content:space-between; width:100%;">
                                <span><i data-lucide="asterisk" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> ROAST MY STATEMENT</span>
                                <span id="card-country-edition" class="tech-mono" style="font-size:0.5rem; opacity:0.6;">GLOBAL ED.</span>
                            </div>`;

ht = ht.replace(t, n);
fs.writeFileSync('index.html', ht);
console.log('Card header patched');
