const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const settingsAppend = `
                <!-- Country & Currency Block -->
                <div class="glossy-panel p-4">
                    <h3>REGION & CONTEXT</h3>
                    <p class="text-muted text-sm mb-4">Determine the local currency and scenario references.</p>
                    
                    <div style="display:flex; flex-direction:column; gap:1rem; max-width:400px;">
                        <div>
                            <label class="tech-mono text-xs text-muted mb-1 display-block">SELECTED COUNTRY</label>
                            <input type="text" id="settings-country-display" class="app-input" value="NONE SELECTED" readonly style="opacity:0.7; cursor:not-allowed;">
                        </div>
                        <button class="action-button outline highlight-hover w-full" onclick="app.switchView('country-select');">
                            <span>CHANGE COUNTRY</span>
                        </button>
                    </div>
                </div>

                <!-- Roast Intensity Block -->
                <div class="glossy-panel p-4">
                    <h3>ROAST INTENSITY</h3>
                    <p class="text-muted text-sm mb-4">How brutally should the system diagnose your money habits?</p>
                    
                    <div style="display:flex; flex-direction:column; gap:0.5rem; max-width:400px;">
                        <button class="action-button w-full intensity-btn" id="btn-intensity-MILD" onclick="app.setRoastIntensity('MILD')" style="border-color: #333">MILD</button>
                        <button class="action-button outline highlight-hover w-full intensity-btn" id="btn-intensity-SAVAGE" onclick="app.setRoastIntensity('SAVAGE')">SAVAGE (DEFAULT)</button>
                        <button class="action-button w-full intensity-btn" id="btn-intensity-BRUTAL" onclick="app.setRoastIntensity('BRUTAL')" style="border-color: #333; color: var(--accent-danger)">BRUTAL</button>
                    </div>
                </div>
`;

const insertPos = html.indexOf('<!-- Privacy & Data -->');
if (insertPos > -1) {
    html = html.substring(0, insertPos) + settingsAppend + '\n                ' + html.substring(insertPos);
    fs.writeFileSync('index.html', html);
    console.log('Settings UI Injected');
} else {
    console.log('Settings Data block not found');
}
