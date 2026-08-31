const fs = require('fs');

const achievementsLogic = `
    // ==========================================
    // NATIVE ACHIEVEMENT SYSTEM
    // ==========================================
    window.AchievementManager = {
        state: { xp: 0, unlocked: [], points: {} },
        db: [
            { id: 'know_thyself', title: 'KNOW THYSELF', desc: 'Complete your first Personality Test.', max: 1, xp: 100 },
            { id: 'roast_veteran', title: 'ROAST VETERAN', desc: 'Complete 3 Personality Tests.', max: 3, xp: 200 },
            { id: 'identity_crisis', title: 'IDENTITY CRISIS', desc: 'Complete 10 Personality Tests.', max: 10, xp: 500 },
            { id: 'brutal_reality', title: 'BRUTAL REALITY', desc: 'Change roast intensity to BRUTAL.', max: 1, xp: 150 },
            { id: 'global_citizen', title: 'GLOBAL CITIZEN', desc: 'Switch your local country parameters.', max: 1, xp: 100 },
            
            { id: 'statement_survivor', title: 'STATEMENT SURVIVOR', desc: 'Successfully analyze your first bank statement CSV.', max: 1, xp: 300 },
            { id: 'data_hoarder', title: 'DATA HOARDER', desc: 'Import over 100 transactions total from statements.', max: 100, xp: 400 },
            
            { id: 'budget_beginner', title: 'BUDGET BEGINNER', desc: 'Create your first expense budget.', max: 1, xp: 100 },
            { id: 'budget_master', title: 'BUDGET MASTER', desc: 'Maintain 5 active budget categories.', max: 5, xp: 250 },
            { id: 'budget_blown', title: 'BUDGET BLOWN', desc: 'Exceed a budget limit.', max: 1, xp: 50 }, // funny one
            
            { id: 'first_save', title: 'FIRST SAVE', desc: 'Log your first savings goal.', max: 1, xp: 100 },
            { id: 'goal_crusher', title: 'GOAL CRUSHER', desc: 'Complete a savings goal to 100%.', max: 1, xp: 500 },
            { id: 'hoarder', title: 'THE HOARDER', desc: 'Create 3 separate active savings goals.', max: 3, xp: 300 },
            
            { id: 'money_tracker', title: 'MONEY TRACKER', desc: 'Log your first manual transaction.', max: 1, xp: 50 },
            { id: 'financial_zen', title: 'FINANCIAL ZEN', desc: 'Log 50 transactions into the system.', max: 50, xp: 400 },
            { id: 'income_lord', title: 'INCOME LORD', desc: 'Log an income transaction rather than an expense.', max: 1, xp: 100 },
            
            { id: 'configured_mind', title: 'CONFIGURED MIND', desc: 'Set a custom display name and avatar.', max: 1, xp: 150 },
            { id: 'share_hero', title: 'SHARE HERO', desc: 'Generate a shareable card to show the world.', max: 1, xp: 100 },
            { id: 'challenge_accepted', title: 'CHALLENGE ACCEPTED', desc: 'Open the app via a Viral Challenge link.', max: 1, xp: 200 },
            
            { id: 'dilemma_novice', title: 'DILEMMA NOVICE', desc: 'Answer your first Daily Money Dilemma.', max: 1, xp: 100 },
            { id: 'dilemma_streak', title: 'DILEMMA STREAK', desc: 'Answer 5 Daily Money Dilemmas.', max: 5, xp: 300 },
            { id: 'impulse_survivor', title: 'IMPULSE SURVIVOR', desc: 'Make a statistically sound saving choice in a Dilemma.', max: 1, xp: 150 },
            { id: 'serial_spender', title: 'SERIAL SPENDER', desc: 'Make a highly chaotic spending choice in a Dilemma.', max: 1, xp: 150 },
            
            { id: 'offline_king', title: 'OFFLINE KING', desc: 'Export your local encrypted data backup.', max: 1, xp: 200 },
            { id: 'dev_reset', title: 'THE BUTTON', desc: 'Press the dangerous DEV reset button.', max: 1, xp: 10 }
        ],

        init() {
            this.load();
            this.injectView();
            // Hook into finance rendering seamlessly
            const origRender = app.finance.render.bind(app.finance);
            app.finance.render = () => {
                origRender();
                this.evaluate();
                this.renderPreview();
            };
            
            // Re-evaluate on app switch view
            const origSwitch = app.switchView.bind(app);
            app.switchView = (v) => { origSwitch(v); this.evaluate(); };
        },

        load() {
            try { this.state = JSON.parse(localStorage.getItem('roast_achievements')) || { xp: 0, unlocked: [], points: {} }; } catch(e){}
        },
        save() {
            localStorage.setItem('roast_achievements', JSON.stringify(this.state));
        },

        grantObjXP(xp) {
            this.state.xp += xp;
        },

        getLevel() {
            const levels = [
                { xp: 0, n: 'FINANCIAL NOVICE' },
                { xp: 500, n: 'FINANCIAL SURVIVOR' },
                { xp: 1200, n: 'MONEY CONTROLLER' },
                { xp: 2500, n: 'FINANCIAL STRATEGIST' },
                { xp: 5000, n: 'MONEY MASTER' }
            ];
            let cr = levels[0], nx = levels[1];
            for (let i=0; i<levels.length; i++) {
                if (this.state.xp >= levels[i].xp) { cr = levels[i]; nx = levels[i+1] || null; }
            }
            return { cr, nx };
        },

        track(id, points = 1) {
            if (this.state.unlocked.includes(id)) return;
            this.state.points[id] = (this.state.points[id] || 0) + points;
            const ach = this.db.find(a => a.id === id);
            if (ach && this.state.points[id] >= ach.max) {
                this.state.points[id] = ach.max;
                this.state.unlocked.push(id);
                this.grantObjXP(ach.xp);
                this.save();
                this.showNotification(ach);
            } else {
                this.save();
            }
        },

        evaluate() {
            // Run silent state checks
            const p = appState && appState.pendingResult;
            let hist = []; try { hist = JSON.parse(localStorage.getItem('roast_seen_qs')) || []; } catch(e){}
            
            if (hist.length >= 15) this.track('know_thyself', 15);
            if (hist.length >= 45) this.track('roast_veteran', 45);
            if (hist.length >= 150) this.track('identity_crisis', 150);
            
            if (appState.roastIntensity === 'BRUTAL') this.track('brutal_reality');
            if (appState.country !== 'NONE' && appState.country !== 'US' && appState.country !== 'GLOBAL') this.track('global_citizen');
            if (appState.isChallenged) this.track('challenge_accepted');
            
            if (app.finance && app.finance.data) {
                if (app.finance.data.budgets && Object.keys(app.finance.data.budgets).length > 0) this.track('budget_beginner');
                if (app.finance.data.budgets && Object.keys(app.finance.data.budgets).length >= 5) this.track('budget_master');
                
                // Budget blown
                for (const [cat, limit] of Object.entries(app.finance.data.budgets || {})) {
                    let sp = 0;
                    app.finance.data.transactions.forEach(t => { if(t.category === cat && t.type==='expense') sp += t.amount; });
                    if (sp > limit) this.track('budget_blown');
                }

                if (app.finance.data.savings && app.finance.data.savings.length > 0) this.track('first_save');
                if (app.finance.data.savings && app.finance.data.savings.length >= 3) this.track('hoarder');
                
                app.finance.data.savings.forEach(s => { if(s.current >= s.target && s.target > 0) this.track('goal_crusher'); });

                const txs = app.finance.data.transactions || [];
                if (txs.length > 0) this.track('money_tracker');
                if (txs.length >= 50) this.track('financial_zen');
                if (txs.some(t => t.id.startsWith('imp_'))) this.track('statement_survivor');
                if (txs.some(t => t.type === 'income')) this.track('income_lord');
                
                let impCount = txs.filter(t => t.id.startsWith('imp_')).length;
                if (impCount >= 100) this.track('data_hoarder', 100);
            }

            if (app.settings && app.settings.settings) {
                if (app.settings.settings.avatar && app.settings.settings.displayName) this.track('configured_mind');
            }

            let dState = null;
            try { dState = JSON.parse(localStorage.getItem('roast_dilemma')); } catch(e){}
            if (dState && dState.answered) {
                this.track('dilemma_novice');
                if(dState.feedback.includes("saving") || dState.feedback.includes("disciplined")) this.track('impulse_survivor');
                if(dState.feedback.includes("Chaos increases") || dState.feedback.includes("compromised")) this.track('serial_spender');
            }
        },

        showNotification(ach) {
            const notif = document.createElement('div');
            notif.className = 'achievement-toast';
            notif.innerHTML = \`<div class="ach-toast-inner">
                <span class="tech-label highlight-acid"><span class="blink">></span> ACHIEVEMENT UNLOCKED</span>
                <h3 style="margin: 0.25rem 0;">\${ach.title}</h3>
                <span class="tech-mono text-muted" style="color:#00ff66;">+\${ach.xp} XP</span>
            </div>\`;
            document.body.appendChild(notif);
            setTimeout(() => notif.classList.add('active'), 50);
            setTimeout(() => {
                notif.classList.remove('active');
                setTimeout(() => notif.remove(), 300);
            }, 4000);
        },

        injectView() {
            // Include styling dynamically
            if (!document.getElementById('achievements-css')) {
                const style = document.createElement('style');
                style.id = 'achievements-css';
                style.innerHTML = \`
                    .achievement-toast { position: fixed; top: 0; left: 0; width: 100%; padding: env(safe-area-inset-top) 1rem 1rem; z-index: 10000; transform: translateY(-100%); transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1); pointer-events: none; }
                    .achievement-toast.active { transform: translateY(0); }
                    .ach-toast-inner { background: rgba(10, 10, 12, 0.95); backdrop-filter: blur(10px); border: 1px solid var(--accent-acid); padding: 1rem; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 0 15px rgba(204,255,0,0.2); }
                    
                    .ach-grid { display: grid; gap: 1rem; margin-bottom: 4rem; }
                    .ach-item { padding: 1rem; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; display: flex; flex-direction: column; cursor: pointer; transition: all 0.2s ease; }
                    .ach-item.unlocked { border-color: var(--accent-acid); background: rgba(204,255,0,0.05); }
                    .ach-item.unlocked .ach-title { color: #fff; }
                    .ach-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: #555; }
                    .ach-lock { float: right; opacity: 0.5; }
                    .ach-unlocked-icon { float: right; color: var(--accent-acid); }
                    
                    .level-bar-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin: 0.5rem 0; overflow: hidden; }
                    .level-bar-fill { height: 100%; background: var(--accent-acid); box-shadow: 0 0 10px var(--accent-acid); }
                \`;
                document.head.appendChild(style);
            }

            // Create Full View
            const viewHTML = \`<section id="view-achievements" class="view hidden">
                <div class="result-header fade-in">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="tech-label highlight-acid"><i data-lucide="award"></i> GAMIFICATION</span>
                        <button class="tech-mono text-muted" style="background:none;border:none;padding:0.5rem;font-size:1.2rem;" onclick="app.switchView('finance')">✕</button>
                    </div>
                    <h2 class="mt-2 text-left" style="font-size:2rem;">FINANCIAL ACHIEVEMENTS</h2>
                    
                    <div class="glossy-panel p-4 mt-4" style="text-align:center;">
                        <h3 class="highlight-acid" id="ach-level-name">FINANCIAL NOVICE</h3>
                        <div class="level-bar-bg mt-2"><div class="level-bar-fill" id="ach-level-fill" style="width:0%;"></div></div>
                        <div class="tech-mono text-muted mt-2" style="font-size:0.8rem;" id="ach-level-stats">LEVEL 01 | 0 / 500 XP</div>
                    </div>
                </div>
                
                <div class="ach-grid mt-4 fade-in-delayed" id="ach-full-list"></div>
                
            </section>\`;
            
            document.getElementById('app-container').insertAdjacentHTML('beforeend', viewHTML);
            app.views.achievements = document.getElementById('view-achievements');
            
            // Modal for details/share
            const modalHTML = \`<div id="ach-detail-modal" class="modal hidden">
                <div class="modal-backdrop" onclick="document.getElementById('ach-detail-modal').classList.add('hidden')"></div>
                <div class="modal-content glossy-panel">
                    <button class="modal-close" onclick="document.getElementById('ach-detail-modal').classList.add('hidden')">✕</button>
                    <div id="ach-share-target" style="padding: 1rem; background: var(--bg-base); border-radius: 8px;">
                        <div class="card-brand mb-4">
                            <i data-lucide="asterisk" style="width:14px; height:14px; display:inline-block; vertical-align:middle;"></i> ROAST MY STATEMENT
                        </div>
                        <span class="tech-label highlight-acid" id="ach-modal-state">✓ UNLOCKED</span>
                        <h2 class="mt-2" id="ach-modal-title" style="font-size: 2rem;">ACHIEVEMENT</h2>
                        <p class="text-muted mt-2" id="ach-modal-desc" style="font-size: 1.1rem;"></p>
                        
                        <div class="progress-bar-bg mt-4" style="height:4px;"><div class="progress-bar-fill" id="ach-modal-fill" style="background:var(--accent-acid);"></div></div>
                        <div style="display:flex; justify-content:space-between; margin-top:0.5rem;" class="tech-mono text-muted text-xs">
                            <span id="ach-modal-prog">0 / 1</span>
                            <span id="ach-modal-xp" style="color:#00ff66;">+100 XP</span>
                        </div>
                    </div>
                    <button class="action-button primary-cta pulse-glow w-full mt-4" id="btn-share-ach" onclick="AchievementManager.shareCurrent()">
                        <span id="ach-share-btn-text">SHARE ACHIEVEMENT</span>
                    </button>
                </div>
            </div>\`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        },

        renderPreview() {
            let container = document.getElementById('finance-ach-preview');
            if(!container) {
                const target = document.getElementById('finance-empty-state').nextElementSibling; // Just before dashboard contents
                const html = \`<div class="glossy-panel p-4 mb-4" id="finance-ach-preview"></div>\`;
                target.insertAdjacentHTML('afterbegin', html);
                container = document.getElementById('finance-ach-preview');
            }

            const un = this.state.unlocked.length;
            const tot = this.db.length;
            const pct = Math.round((un / tot) * 100);

            // Construct 10 character bracket loading string
            let bracket = '';
            for(let i=0; i<10; i++) bracket += (i < (un/tot)*10) ? '█' : '░';

            let recHTML = '';
            const recentIds = [...this.state.unlocked].reverse().slice(0, 2);
            recentIds.forEach(rid => {
                const a = this.db.find(x => x.id === rid);
                if(a) recHTML += \`<div class="tech-mono" style="font-size:0.75rem; color:#fff; margin-bottom:0.25rem;">✓ \${a.title}</div>\`;
            });

            container.innerHTML = \`<div style="display:flex; justify-content:space-between; align-items:center;">
                    <span class="tech-label highlight-acid"><i data-lucide="award" style="width:14px; display:inline-block; vertical-align:middle;"></i> ACHIEVEMENTS</span>
                    <span class="tech-mono" style="font-size:0.75rem;">\${un} / \${tot} UNLOCKED</span>
                </div>
                <div class="tech-mono text-muted mt-2" style="font-size:0.85rem;">[\${bracket}]</div>
                <div class="mt-3">\${recHTML}</div>
                <button class="action-button outline subtle mt-4 w-full" onclick="AchievementManager.openFullscreen()">VIEW ALL →</button>\`;
            
            if(window.lucide) window.lucide.createIcons();
        },

        async openFullscreen() {
            app.switchView('achievements');
            
            const { cr, nx } = this.getLevel();
            document.getElementById('ach-level-name').textContent = cr.n;
            if(nx) {
                const lvlPct = Math.max(0, Math.min(100, ((this.state.xp - cr.xp) / (nx.xp - cr.xp)) * 100));
                document.getElementById('ach-level-fill').style.width = lvlPct + '%';
                document.getElementById('ach-level-stats').textContent = \`\${this.state.xp} / \${nx.xp} XP\`;
            } else {
                document.getElementById('ach-level-fill').style.width = '100%';
                document.getElementById('ach-level-stats').textContent = \`MAX LEVEL REACHED\`;
            }

            const list = document.getElementById('ach-full-list');
            list.innerHTML = '';
            
            // Sort unlocked first, then locked
            const sortedDb = [...this.db].sort((a,b) => {
                let uA = this.state.unlocked.includes(a.id);
                let uB = this.state.unlocked.includes(b.id);
                if(uA && !uB) return -1;
                if(!uA && uB) return 1;
                return 0;
            });

            sortedDb.forEach(a => {
                const isUn = this.state.unlocked.includes(a.id);
                list.innerHTML += \`<div class="ach-item \${isUn ? 'unlocked' : ''}" onclick="AchievementManager.openDetail('\${a.id}')">
                    <div>
                        <span class="ach-title">\${a.title}</span>
                        \${isUn ? '<i data-lucide="check-circle" class="ach-unlocked-icon" style="width:18px;"></i>' : '<i data-lucide="lock" class="ach-lock" style="width:18px;"></i>'}
                    </div>
                    <p class="text-muted mt-2" style="font-size:0.8rem; line-height:1.4;">\${a.desc}</p>
                </div>\`;
            });
            if(window.lucide) window.lucide.createIcons();
        },

        openDetail(id) {
            const a = this.db.find(x => x.id === id);
            if(!a) return;
            this.currentViewId = id;
            const isUn = this.state.unlocked.includes(id);
            const curP = this.state.points[id] || 0;
            
            document.getElementById('ach-modal-state').innerHTML = isUn ? '✓ UNLOCKED' : '🔒 LOCKED';
            document.getElementById('ach-modal-state').style.color = isUn ? 'var(--accent-acid)' : 'var(--text-muted)';
            document.getElementById('ach-modal-title').textContent = a.title;
            document.getElementById('ach-modal-desc').textContent = a.desc;
            
            const pct = Math.min(100, Math.round((curP / a.max) * 100));
            document.getElementById('ach-modal-fill').style.width = pct + '%';
            document.getElementById('ach-modal-fill').style.background = isUn ? 'var(--accent-acid)' : 'var(--text-muted)';
            document.getElementById('ach-modal-prog').textContent = \`PROGRESS: \${Math.min(curP, a.max)} / \${a.max}\`;
            document.getElementById('ach-modal-xp').textContent = \`+\${a.xp} XP\`;
            
            document.getElementById('btn-share-ach').style.display = isUn ? 'inline-flex' : 'none';
            document.getElementById('ach-detail-modal').classList.remove('hidden');
        },

        shareCurrent() {
            const btnSpan = document.getElementById('ach-share-btn-text');
            const target = document.getElementById('ach-share-target');
            if(!window.html2canvas) return;

            btnSpan.textContent = "GENERATING...";
            
            html2canvas(target, { scale: 2, backgroundColor: '#0A0A0C', useCORS: true, logging: false }).then(canvas => {
                canvas.toBlob(blob => {
                    const file = new File([blob], 'roast-achievement.png', { type: 'image/png' });
                    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
                        navigator.share({ title: 'Achievement Unlocked', text: \`I just unlocked \${document.getElementById('ach-modal-title').textContent} in Roast My Statement!\`, files: [file] }).catch(e=>{});
                    } else if (window.AndroidNativeBridge) {
                        const reader = new FileReader();
                        reader.onloadend = () => { window.AndroidNativeBridge.saveImageToGallery(reader.result); };
                        reader.readAsDataURL(blob);
                    } else {
                        // Fallback download
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a'); a.href = url; a.download = 'achievement.png';
                        document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
                    }
                    btnSpan.textContent = "SHARE ACHIEVEMENT";
                }, 'image/png');
            });
        }
    };
    
    // Boot manager strictly on load
    window.AchievementManager.init();
`;

let js = fs.readFileSync('js/app.js', 'utf8');

// Insert safely into the Android native wrapper block.
const tgtStr = "window.androidOnboarding.init();";
const idx = js.indexOf(tgtStr);

if (idx > -1) {
    js = js.substring(0, idx) + achievementsLogic + "\n    " + js.substring(idx);
    fs.writeFileSync('js/app.js', js);
    console.log('✅ Injected Achievement Manager');
} else {
    console.log('❌ Failed to inject Achievement Manager; android wrapper not found.');
}
