const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

// 1. AppState Extension
const stateInsertPos = js.indexOf('scores: {');
const newAppStateVars = `country: localStorage.getItem('roast_country') || 'NONE',
    roastIntensity: localStorage.getItem('roast_intensity') || 'SAVAGE',
    `;
js = js.substring(0, stateInsertPos) + newAppStateVars + js.substring(stateInsertPos);

// 2. Views caching
const viewsInsertPos = js.indexOf('quiz: document.getElementById(\'view-quiz\'),');
js = js.substring(0, viewsInsertPos) + "countrySelect: document.getElementById('view-country-select'),\n            " + js.substring(viewsInsertPos);

// 3. New Methods for Country Management
const newMethods = `
    // --- Phase 1: COUNTRY & SETTINGS MANAGEMENT ---
    filterCountries() {
        const val = (document.getElementById('country-search').value || '').toLowerCase();
        const items = document.querySelectorAll('.country-item');
        items.forEach(el => {
            if(el.dataset.name.toLowerCase().includes(val) || el.dataset.code.toLowerCase().includes(val)) el.style.display = 'flex';
            else el.style.display = 'none';
        });
    },

    selectCountry(code) {
        document.querySelectorAll('.country-item').forEach(el => {
            el.classList.remove('selected');
            if(el.dataset.code === code) el.classList.add('selected');
        });
        
        let cBtn = document.getElementById('btn-confirm-country');
        cBtn.dataset.code = code;
        cBtn.disabled = false;
        cBtn.style.opacity = '1';
        cBtn.style.pointerEvents = 'auto';
    },

    confirmCountry() {
        const code = document.getElementById('btn-confirm-country').dataset.code;
        if (!code) return;
        localStorage.setItem('roast_country', code);
        appState.country = code;
        this.updateSettingsUI();
        this.startQuiz(); // Jump to quiz after selection
    },

    setRoastIntensity(val) {
        localStorage.setItem('roast_intensity', val);
        appState.roastIntensity = val;
        this.updateSettingsUI();
    },

    updateSettingsUI() {
        document.querySelectorAll('.intensity-btn').forEach(btn => btn.classList.remove('selected'));
        let b = document.getElementById('btn-intensity-' + appState.roastIntensity);
        if (b) b.classList.add('selected');
        
        const cd = document.getElementById('settings-country-display');
        if (cd) {
            cd.value = appState.country === 'NONE' ? 'NONE SELECTED' : (window.APP_DATA.COUNTRIES[appState.country].name + ' (' + window.APP_DATA.COUNTRIES[appState.country].currency + ')');
        }
    },

    renderCountryList() {
        const con = document.getElementById('country-list-container');
        if(!con) return;
        con.innerHTML = '';
        Object.values(window.APP_DATA.COUNTRIES).forEach(c => {
            let item = document.createElement('div');
            item.className = 'country-item';
            item.dataset.code = c.code; item.dataset.name = c.name;
            item.onclick = () => this.selectCountry(c.code);
            item.innerHTML = \`<span class="country-name">\${c.name}</span><span class="country-code">\${c.currency} \${c.code}</span>\`;
            con.appendChild(item);
        });
    },
`;

const mapInsert = js.indexOf('startQuiz() {');
js = js.substring(0, mapInsert) + newMethods + '\n    ' + js.substring(mapInsert);

// 4. Hook init and update default test logic
js = js.replace('this.cacheDOM();', 'this.cacheDOM();\n        this.renderCountryList();\n        this.updateSettingsUI();');
js = js.replace('startQuiz() {', 'startQuiz() {\n        if (appState.country === "NONE") { this.switchView("countrySelect"); return; }');

// 5. Change activeQuizQuestions mapping
const startQuizInnerPos = js.indexOf('appState.activeQuizQuestions = JSON.parse(JSON.stringify(QUESTIONS));');
js = js.substring(0, startQuizInnerPos) + 
`
        let seenIds = JSON.parse(localStorage.getItem('roast_seen_qs')) || [];
        appState.activeQuizQuestions = window.APP_DATA.getQuestionsForCountry(appState.country, 15, seenIds);
` + js.substring(startQuizInnerPos + 'appState.activeQuizQuestions = JSON.parse(JSON.stringify(QUESTIONS));'.length);

fs.writeFileSync('js/app.js', js);
console.log('App methods injected');
