const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const t = `// Inject Bottom Navigation
        const bottomNav = document.createElement('div');
        bottomNav.className = 'android-bottom-nav';
        bottomNav.innerHTML = \`
            <button class="nav-tab active" data-target="home" onclick="app.switchView('home')">
                <i data-lucide="user"></i><span>Personality</span>
            </button>
            <button class="nav-tab" data-target="statement" onclick="app.finance.openImportModal();">
                <i data-lucide="file-text"></i><span>Statement</span>
            </button>
            <button class="nav-tab" data-target="finance" onclick="app.finance.openDashboard()">
                <i data-lucide="wallet"></i><span>Money</span>
            </button>
            <button class="nav-tab" data-target="settings" onclick="app.settings.openSettings()">
                <i data-lucide="settings"></i><span>Settings</span>
            </button>
        \`;
        document.body.appendChild(bottomNav);`;

const n = `// Top Ticker Priority Rewrite (Android Only)
        const ticker = document.querySelector('.ticker-content');
        if (ticker) {
            ticker.innerHTML = \`<span class="ticker-item">MONEY MANAGEMENT ACTIVE</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">PERSONALITY ENGINE</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">STATEMENT PROCESSING</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">100% LOCAL PROCESSING</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">MONEY MANAGEMENT ACTIVE</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">PERSONALITY ENGINE</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">STATEMENT PROCESSING</span>
            <span class="ticker-separator">✱</span>
            <span class="ticker-item">100% LOCAL PROCESSING</span>\`;
        }

        // Inject Bottom Navigation (Reordered Priority)
        const bottomNav = document.createElement('div');
        bottomNav.className = 'android-bottom-nav';
        // Priority: 1) Money, 2) Personality, 3) Statement, 4) Settings
        bottomNav.innerHTML = \`
            <button class="nav-tab" data-target="finance" onclick="app.finance.openDashboard()">
                <i data-lucide="wallet"></i><span>Money</span>
            </button>
            <button class="nav-tab active" data-target="home" onclick="app.switchView('home')">
                <i data-lucide="user"></i><span>Personality</span>
            </button>
            <button class="nav-tab" data-target="statement" onclick="app.finance.openImportModal();">
                <i data-lucide="file-text"></i><span>Statement</span>
            </button>
            <button class="nav-tab" data-target="settings" onclick="app.settings.openSettings()">
                <i data-lucide="settings"></i><span>Settings</span>
            </button>
        \`;
        document.body.appendChild(bottomNav);`;

js = js.replace(t, n);
fs.writeFileSync('js/app.js', js);
console.log('Patched Android Nav and Ticker priority safely.');
