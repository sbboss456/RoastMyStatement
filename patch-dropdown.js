const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const t = `<input type="text" id="settings-country-display" class="app-input" value="NONE SELECTED" readonly style="opacity:0.7; cursor:not-allowed;">`;
const n = `<div class="custom-dropdown-display" tabindex="0" onclick="app.switchView('countrySelect')">
                                <span id="settings-country-display">NONE SELECTED</span>
                                <i data-lucide="chevron-down" class="dropdown-icon"></i>
                            </div>`;

html = html.replace(t, n);
fs.writeFileSync('index.html', html);
console.log('index.html patched');
