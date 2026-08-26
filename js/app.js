/**
 * ROAST MY STATEMENT - FRONTEND APP
 * Financial Personality Engine + Viral Loop
 */

// ==========================================
// DATA STRUCTURES
// ==========================================
const QUESTIONS = [
    {
        id: "q1",
        text: "You suddenly get ₹5,000 extra. What's your very first thought?",
        options: [
            { text: "A. Straight into the savings account.", impact: { saving: 10, chaos: -5, impulse: -10 } },
            { text: "B. Let's see what I can buy online right now.", impact: { impulse: 15, digital: 5, chaos: 5 } },
            { text: "C. Food. Obviously.", impact: { food: 15, impulse: 5 } },
            { text: "D. Give it to my pending debts.", impact: { saving: 5, chaos: -2 } },
            { text: "E. Wait... I already spent it somehow.", impact: { chaos: 20, impulse: 10 } }
        ]
    },
    {
        id: "q2",
        text: "It's the end of the month and you still have money left. What happened?",
        options: [
            { text: "A. It's called budgeting.", impact: { saving: 15, chaos: -10 } },
            { text: "B. I was too busy to spend it.", impact: { chaos: -5 } },
            { text: "C. That literally never happens to me.", impact: { chaos: 15, impulse: 10 } },
            { text: "D. I forgot to pay a bill.", impact: { chaos: 10, digital: 5 } }
        ]
    },
    {
        id: "q3",
        text: "Your friend says: 'Let's order food.' Your reaction?",
        options: [
            { text: "A. 'I already ate.' (Lies to save money)", impact: { saving: 10, food: -5 } },
            { text: "B. 'Only if we split it evenly.'", impact: { saving: 5 } },
            { text: "C. 'I'll pay! Let's get the large.'", impact: { food: 10, impulse: 10, chaos: 5 } },
            { text: "D. 'I already ordered 5 minutes ago.'", impact: { food: 15, impulse: 10 } }
        ]
    },
    {
        id: "q4",
        text: "You see something online that you really want, but you don't need it. What happens next?",
        options: [
            { text: "A. Close the tab immediately.", impact: { saving: 10, impulse: -10 } },
            { text: "B. Add to cart. Leave it there for a week.", impact: { impulse: 5 } },
            { text: "C. Buy it immediately and hope I survive the month.", impact: { impulse: 20, chaos: 15 } },
            { text: "D. Check if I can pay in 4 installments.", impact: { impulse: 15, chaos: 10, digital: 10 } }
        ]
    },
    {
        id: "q5",
        text: "How many digital subscriptions do you currently pay for?",
        options: [
            { text: "A. Zero. I pirate everything.", impact: { saving: 10, digital: -10, chaos: 5 } },
            { text: "B. 1–2. Just the essentials.", impact: { saving: 5, digital: 5 } },
            { text: "C. 3–5. I need my entertainment.", impact: { digital: 15, impulse: 5 } },
            { text: "D. I don't know and I am too afraid to look.", impact: { digital: 20, chaos: 15 } }
        ]
    },
    {
        id: "q6",
        text: "You have ₹500 left for the whole week. How confident are you?",
        options: [
            { text: "A. Easy. I can make it last two weeks.", impact: { saving: 15, chaos: -10 } },
            { text: "B. Slightly stressed, but manageable.", impact: { saving: 5 } },
            { text: "C. It'll be gone by Tuesday.", impact: { chaos: 15, impulse: 15 } },
            { text: "D. I will borrow money from a friend.", impact: { chaos: 10 } }
        ]
    },
    {
        id: "q7",
        text: "Be honest: What is your biggest financial weakness?",
        options: [
            { text: "A. Food & Delivery apps.", impact: { food: 20 } },
            { text: "B. Online Shopping / Clothes.", impact: { impulse: 15 } },
            { text: "C. Video Games & Microtransactions.", impact: { digital: 20 } },
            { text: "D. Going out / Socializing.", impact: { impulse: 10, chaos: 5 } },
            { text: "E. Existing.", impact: { chaos: 15 } }
        ]
    },
    {
        id: "q8",
        text: "Do you explicitly check your bank balance before spending?",
        options: [
            { text: "A. Always. Down to the exact decimal.", impact: { saving: 15, chaos: -15 } },
            { text: "B. Sometimes.", impact: { saving: 5 } },
            { text: "C. No. If the card declines, it declines.", impact: { chaos: 20, impulse: 10 } },
            { text: "D. I actively avoid looking at it.", impact: { chaos: 15 } }
        ]
    }
];

const PERSONALITIES = [
    {
        id: "boss", name: "THE FINANCIAL BOSS", emoji: "👑", desc: "You have terrifyingly good control over your money.",
        condition: (scores) => scores.saving > 40 && scores.chaos < 30
    },
    {
        id: "foodie", name: "THE FOODIE MENACE", emoji: "🍔", desc: "80% of your income is converted directly into calories.",
        condition: (scores) => scores.food > 30
    },
    {
        id: "goblin", name: "THE DIGITAL GOBLIN", emoji: "🎮", desc: "You buy pixels instead of physical possessions.",
        condition: (scores) => scores.digital > 25
    },
    {
        id: "impulse", name: "THE IMPULSE BUYER", emoji: "🛍️", desc: "You see it. You like it. You buy it. You regret it.",
        condition: (scores) => scores.impulse > 40
    },
    {
        id: "menace", name: "THE FINANCIAL MENACE", emoji: "💀", desc: "You don't spend money. You release it into the wild.",
        condition: (scores) => scores.chaos > 45 || (scores.chaos > 30 && scores.impulse > 30)
    },
    {
        id: "default", name: "THE AVERAGE SURVIVOR", emoji: "😐", desc: "You are financially floating. Neither rich nor broke.",
        condition: () => true
    }
];

// ==========================================
// STATE MANAGEMENT
// ==========================================
const appState = {
    currentQuestion: 0,
    isChallenged: false,
    challengerName: null,
    scores: { saving: 0, chaos: 0, impulse: 0, food: 0, digital: 0 }
};

// ==========================================
// APP LOGIC
// ==========================================
const app = {
    views: {},
    
    init() {
        this.cacheDOM();
        this.checkChallengeURL(); // Check for viral loop params
        this.bindEvents();
        this.initCursor();
        this.initObservers();
    },

    cacheDOM() {
        this.views = {
            home: document.getElementById('view-home'),
            quiz: document.getElementById('view-quiz'),
            analyzing: document.getElementById('view-analyzing'),
            result: document.getElementById('view-result')
        };
        this.qContainer = document.getElementById('question-container');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');
        this.modal = document.getElementById('challenge-modal');
        this.inputFriendName = document.getElementById('friend-name');
    },

    bindEvents() {
        // Main Quiz Flow
        document.getElementById('btn-start-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('btn-show-csv').addEventListener('click', () => {
            document.getElementById('legacy-uploader').classList.remove('hidden');
            document.getElementById('legacy-uploader').scrollIntoView({ behavior: 'smooth' });
        });
        
        // Results
        document.getElementById('btn-restart').addEventListener('click', () => this.resetQuiz());
        document.getElementById('btn-share-result').addEventListener('click', () => this.shareResult());
        
        // Viral Challenge Loop
        document.getElementById('btn-open-challenge').addEventListener('click', () => this.openChallengeModal());
        document.getElementById('btn-close-modal').addEventListener('click', () => this.closeChallengeModal());
        document.getElementById('modal-backdrop').addEventListener('click', () => this.closeChallengeModal());
        this.inputFriendName.addEventListener('input', () => this.updateChallengePreview());
        document.getElementById('btn-share-challenge').addEventListener('click', () => this.shareChallenge(true));
        document.getElementById('btn-copy-challenge').addEventListener('click', () => this.shareChallenge(false));
    },

    // --- SETUP VIRAL LOOP LANDING ---
    checkChallengeURL() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('challenge')) {
            appState.isChallenged = true;
            const cName = params.get('challenge');
            appState.challengerName = (cName && cName !== "1" && cName.trim() !== "") ? cName.trim() : null;
            
            // Mutate landing page
            const heroTitle = document.getElementById('hero-title-text');
            const heroSub = document.getElementById('hero-subtitle-text');
            const btnSpan = document.getElementById('btn-start-span');
            
            if (appState.challengerName) {
                heroTitle.innerHTML = `<span class="highlight-acid skew-text">${appState.challengerName.toUpperCase()}</span><br>THINKS YOU CAN'T BE WORSE.`;
            } else {
                heroTitle.innerHTML = `YOU'VE BEEN <br><span class="highlight-acid skew-text">CHALLENGED.</span>`;
            }
            
            heroSub.textContent = "Prove them wrong. Discover your Financial Personality.";
            btnSpan.textContent = "ACCEPT THE CHALLENGE →";
        }
    },

    // --- CURSOR AND FX ---
    initCursor() {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        if (window.matchMedia("(any-pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                requestAnimationFrame(() => ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`);
            });
            const applyHover = () => {
                document.querySelectorAll('a, button, .answer-btn, .uploader-card, input').forEach(el => {
                    if (el.dataset.cursorBound) return;
                    el.addEventListener('mouseenter', () => ring.classList.add('active'));
                    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
                    el.dataset.cursorBound = true;
                });
            };
            applyHover();
            this.applyCursorHover = applyHover;
        } else {
            this.applyCursorHover = () => {};
        }
    },

    initObservers() {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(e => {
                if (e.isIntersecting) { e.target.classList.add('active'); observer.unobserve(e.target); }
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
        setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) el.classList.add('active');
            });
        }, 100);
    },

    switchView(viewName) {
        Object.values(this.views).forEach(v => v.classList.add('hidden'));
        this.views[viewName].classList.remove('hidden');
        window.scrollTo(0, 0);
    },

    // --- QUIZ FLOW ---
    startQuiz() {
        appState.currentQuestion = 0;
        appState.scores = { saving: 0, chaos: 0, impulse: 0, food: 0, digital: 0 };
        this.switchView('quiz');
        this.renderQuestion();
    },

    renderQuestion() {
        if (appState.currentQuestion >= QUESTIONS.length) return this.finishQuiz();
        const q = QUESTIONS[appState.currentQuestion];
        this.progressBar.style.width = `${((appState.currentQuestion) / QUESTIONS.length) * 100}%`;
        this.progressText.textContent = `0${appState.currentQuestion + 1} / 0${QUESTIONS.length}`;

        let html = `<div class="question-card" id="q-card"><h2 class="question-title">${q.text}</h2><div class="answer-grid">`;
        q.options.forEach((opt, i) => {
            html += `<button class="answer-btn" onclick="app.handleAnswer(${i})"><span>${opt.text}</span></button>`;
        });
        html += `</div></div>`;
        this.qContainer.innerHTML = html;
        this.applyCursorHover();
    },

    handleAnswer(optIndex) {
        const option = QUESTIONS[appState.currentQuestion].options[optIndex];
        for (const [trait, value] of Object.entries(option.impact)) {
            appState.scores[trait] += value;
        }
        const card = document.getElementById('q-card');
        card.style.opacity = '0'; card.style.transform = 'translateY(-20px)'; card.style.transition = 'all 0.2s';
        setTimeout(() => { appState.currentQuestion++; this.renderQuestion(); }, 200);
    },

    finishQuiz() {
        this.progressBar.style.width = `100%`;
        setTimeout(() => { this.switchView('analyzing'); this.runTerminalAnimation(); }, 300);
    },

    // --- TERMINAL & RESULTS ---
    runTerminalAnimation() {
        const lines = ["INITIATING DIAGNOSTIC PROTOCOL...", "ANALYZING SPENDING BEHAVIOR...", "CALCULATING IMPULSE DECISIONS...", "WARNING: SELF-CONTROL MODULE NOT FOUND", "CROSS-REFERENCING TERRIBLE CHOICES...", "PERSONALITY DETECTED."];
        const out = document.getElementById('terminal-output');
        out.innerHTML = ""; document.getElementById('main-ticker').classList.add('alert-mode');
        
        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                const p = document.createElement('div'); p.className = 'terminal-line'; p.textContent = `> ${lines[i]}`; out.appendChild(p); i++;
            } else {
                clearInterval(interval); setTimeout(() => this.calculateAndShowResult(), 800);
            }
        }, 400);
    },

    calculateAndShowResult() {
        let foundPersonality = PERSONALITIES[PERSONALITIES.length - 1];
        for (const p of PERSONALITIES) { if (p.condition(appState.scores)) { foundPersonality = p; break; } }
        
        // Generate contextual roast from the external ROAST_LIBRARY
        const roast = window.ROAST_LIBRARY.generateRoast(foundPersonality.id, appState.scores);
        
        const normalized = {
            chaos: Math.min(100, Math.max(5, appState.scores.chaos * 2 + 20)),
            impulse: Math.min(100, Math.max(5, appState.scores.impulse * 2 + 20)),
            saving: Math.min(100, Math.max(5, appState.scores.saving * 2 + 10)),
            digital: Math.min(100, Math.max(5, appState.scores.digital * 2.5)),
            food: Math.min(100, Math.max(5, appState.scores.food * 2.5))
        };

        this.renderResultUI(foundPersonality, roast, normalized);
        this.switchView('result');
    },

    renderResultUI(persona, roast, scores) {
        if (appState.isChallenged) {
            document.getElementById('challenge-accepted-msg').classList.remove('hidden');
            document.getElementById('normal-diagnosis-msg').classList.add('hidden');
        }

        document.getElementById('result-title').textContent = persona.name;
        document.getElementById('result-desc').textContent = persona.desc;
        document.getElementById('card-emoji').textContent = persona.emoji;
        document.getElementById('card-title').textContent = persona.name;
        document.getElementById('card-desc').textContent = persona.desc;
        document.getElementById('card-roast-text').textContent = `"${roast}"`;
        document.getElementById('roast-text-full').textContent = `"${roast}"`;
        
        const top3Scores = [
            { label: 'CHAOS', val: scores.chaos }, { label: 'IMPULSE', val: scores.impulse }, { label: 'SAVING', val: scores.saving }
        ];
        
        let cardScoresHTML = '';
        top3Scores.forEach(s => {
            cardScoresHTML += `<div class="score-line"><span class="score-name">${s.label}</span><div class="score-value-bar"><div class="score-inner" style="width: ${Math.max(10, s.val)}%;"></div></div></div>`;
        });
        document.getElementById('card-scores').innerHTML = cardScoresHTML;

        const allScoresList = [
            { label: 'FINANCIAL CHAOS', val: scores.chaos }, { label: 'IMPULSE CONTROL', val: 100 - scores.impulse },
            { label: 'SAVING ABILITY', val: scores.saving }, { label: 'FOOD DEPENDENCY', val: scores.food }, { label: 'DIGITAL HOARDING', val: scores.digital }
        ];
        
        let breakdownHTML = '';
        allScoresList.forEach(s => {
            breakdownHTML += `<div class="full-score-item"><div class="score-header"><span>${s.label}</span><span>${Math.round(s.val)} / 100</span></div><div class="score-track"><div class="score-fill" style="width: 0%;" data-target="${s.val}"></div></div></div>`;
        });
        document.getElementById('score-breakdown').innerHTML = breakdownHTML;
        setTimeout(() => document.querySelectorAll('.score-fill').forEach(el => el.style.width = el.dataset.target + '%'), 500);
    },

    shareResult() {
        if (navigator.share) {
            navigator.share({ title: 'Roast My Statement', text: `I just took the Financial Personality test and I was diagnosed as ${document.getElementById('result-title').textContent}!`, url: window.location.href }).catch(()=>{});
        } else {
            alert('Screenshot the card to share with friends!');
        }
    },

    resetQuiz() {
        // Strip URL param without reload
        if (window.history.replaceState) { window.history.replaceState(null, '', window.location.pathname); }
        appState.isChallenged = false; appState.challengerName = null;
        
        document.getElementById('hero-title-text').innerHTML = `WHAT KIND OF <br><span class="highlight-acid skew-text">SPENDER ARE YOU?</span>`;
        document.getElementById('hero-subtitle-text').textContent = "Answer a few questions. Discover your financial personality. Get roasted abruptly and brutally. (100% Local)";
        document.getElementById('btn-start-span').textContent = "DISCOVER MY PERSONALITY";
        document.getElementById('challenge-accepted-msg').classList.add('hidden');
        document.getElementById('normal-diagnosis-msg').classList.remove('hidden');
        document.getElementById('main-ticker').classList.remove('alert-mode');
        this.switchView('home');
    },

    // --- VIRAL CHALLENGE MODAL ---
    openChallengeModal() {
        this.inputFriendName.value = '';
        this.updateChallengePreview();
        this.modal.classList.remove('hidden');
    },

    closeChallengeModal() {
        this.modal.classList.add('hidden');
    },

    updateChallengePreview() {
        const val = this.inputFriendName.value.trim();
        const pt = document.getElementById('preview-title');
        pt.textContent = val ? `${val}, you've been challenged.` : `You've been challenged.`;
    },

    shareChallenge(tryNative) {
        const val = this.inputFriendName.value.trim();
        const baseUrl = window.location.origin + window.location.pathname;
        const challengeUrl = val ? `${baseUrl}?challenge=${encodeURIComponent(val)}` : `${baseUrl}?challenge=1`;
        
        const shareText = `I just found out what kind of spender I am 💀\n\nThink you can do better?\nTake the Financial Personality quiz:\n\n${challengeUrl}`;
        
        if (tryNative && navigator.share) {
            navigator.share({ title: 'You\'ve been challenged.', text: shareText }).catch(console.error);
            this.closeChallengeModal();
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                const btnSpan = document.getElementById('copy-btn-text');
                btnSpan.textContent = "COPIED ✓";
                setTimeout(() => { btnSpan.textContent = "COPY CHALLENGE LINK"; this.closeChallengeModal(); }, 1500);
            }).catch(() => alert('Failed to copy.'));
        }
    }
};

app.init();
