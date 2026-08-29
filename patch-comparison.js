const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const tOld = `shareChallenge(tryNative) {
        const val = this.inputFriendName.value.trim();
        const baseUrl = window.location.origin + window.location.pathname;
        const challengeUrl = val ? \`\${baseUrl}?challenge=\${encodeURIComponent(val)}\` : \`\${baseUrl}?challenge=1\`;`;

const tNew = `shareChallenge(tryNative) {
        const val = this.inputFriendName.value.trim();
        const baseUrl = window.location.origin + window.location.pathname;
        
        let extraParams = '';
        if (appState.pendingResult) {
            extraParams = \`&c_score=\${appState.pendingResult.normalized.chaos || 50}&c_pers=\${appState.pendingResult.persona.id}\`;
        }
        
        const challengeUrl = val ? \`\${baseUrl}?challenge=\${encodeURIComponent(val)}\${extraParams}\` : \`\${baseUrl}?challenge=1\${extraParams}\`;`;

js = js.replace(tOld, tNew);

// Add read logic to checkChallengeURL()
const cOld = `    checkChallengeURL() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('challenge')) {
            appState.isChallenged = true;
            const cName = params.get('challenge');
            if (cName !== '1') appState.challengerName = cName;
            
            const btnSpan = document.getElementById('btn-start-span');
            if(btnSpan) btnSpan.textContent = "ACCEPT THE CHALLENGE →";
            const heroSub = document.getElementById('hero-subtitle-text');
            if(heroSub) heroSub.textContent = "Prove them wrong. Discover your Financial Personality.";
        }
    },`;

const cNew = `    checkChallengeURL() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('challenge')) {
            appState.isChallenged = true;
            const cName = params.get('challenge');
            if (cName !== '1') appState.challengerName = cName;
            
            // Extract comparison logic
            if (params.has('c_score')) appState.challengerScore = parseInt(params.get('c_score') || '50', 10);
            if (params.has('c_pers')) appState.challengerPers = params.get('c_pers');
            
            const btnSpan = document.getElementById('btn-start-span');
            if(btnSpan) btnSpan.textContent = "ACCEPT THE CHALLENGE →";
            const heroSub = document.getElementById('hero-subtitle-text');
            if(heroSub) heroSub.textContent = "Prove them wrong. Discover your Financial Personality.";
        }
    },`;

js = js.replace(cOld, cNew);
fs.writeFileSync('js/app.js', js);
console.log('Comparison Injection Done');
