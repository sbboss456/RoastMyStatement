/**
 * ROAST MY STATEMENT - FRONTEND APP
 * Financial Personality Engine
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
        id: "boss",
        name: "THE FINANCIAL BOSS",
        emoji: "👑",
        desc: "You have terrifyingly good control over your money.",
        roasts: [
            "You probably have a spreadsheet for buying groceries, you absolute psycho.",
            "You have lots of money but no friends to spend it with.",
            "Your bank account is thriving, but your social life is a barren wasteland."
        ],
        condition: (scores) => scores.saving > 40 && scores.chaos < 30
    },
    {
        id: "foodie",
        name: "THE FOODIE MENACE",
        emoji: "🍔",
        desc: "80% of your income is converted directly into calories.",
        roasts: [
            "The delivery driver knows you better than your parents do.",
            "Your financial portfolio is just a collection of Zomato/Swiggy receipts.",
            "You spend more on food you could have made at home for 20 rupees."
        ],
        condition: (scores) => scores.food > 30
    },
    {
        id: "goblin",
        name: "THE DIGITAL GOBLIN",
        emoji: "🎮",
        desc: "You buy pixels instead of physical possessions.",
        roasts: [
            "You are paying for 4 streaming services you haven't opened in three months.",
            "Your steam library has more unplayed games than your bank has rupees.",
            "You probably paid for a premium skin while eating instant noodles."
        ],
        condition: (scores) => scores.digital > 25
    },
    {
        id: "impulse",
        name: "THE IMPULSE BUYER",
        emoji: "🛍️",
        desc: "You see it. You like it. You buy it. You regret it.",
        roasts: [
            "Your packages arrive faster than your paycheck.",
            "You treat 'Add to Cart' like a stress relief button. Grow up.",
            "Marketers love you because you fall for a '10% off' on a thing you don't need."
        ],
        condition: (scores) => scores.impulse > 40
    },
    {
        id: "menace",
        name: "THE FINANCIAL MENACE",
        emoji: "💀",
        desc: "You don't spend money. You release it into the wild.",
        roasts: [
            "Your wallet doesn't have a spending problem. It has a survival problem.",
            "Your bank statement reads like a cry for help.",
            "You are exactly one minor inconvenience away from total bankruptcy."
        ],
        condition: (scores) => scores.chaos > 45 || (scores.chaos > 30 && scores.impulse > 30)
    },
    {
        id: "default",
        name: "THE AVERAGE SURVIVOR",
        emoji: "😐",
        desc: "You are financially floating. Neither rich nor broke.",
        roasts: [
            "Your financial life is painfully average and profoundly boring.",
            "You try to save but somehow end up exactly at zero by month end.",
            "You exist in a constant state of 'I really shouldn't buy this' and then buying it anyway."
        ],
        condition: () => true // Fallback
    }
];


// ==========================================
// STATE MANAGEMENT
// ==========================================

const appState = {
    currentQuestion: 0,
    scores: {
        saving: 0,
        chaos: 0,
        impulse: 0,
        food: 0,
        digital: 0
    }
};

// ==========================================
// APP LOGIC
// ==========================================

const app = {
    // DOM Elements
    views: {},
    
    init() {
        this.cacheDOM();
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
    },

    bindEvents() {
        document.getElementById('btn-start-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('btn-show-csv').addEventListener('click', () => {
            document.getElementById('legacy-uploader').classList.remove('hidden');
            document.getElementById('legacy-uploader').scrollIntoView({ behavior: 'smooth' });
        });
        
        document.getElementById('btn-restart').addEventListener('click', () => this.resetQuiz());
        document.getElementById('btn-share').addEventListener('click', () => this.triggerShare());
    },

    // --- CURSOR AND FX ---

    initCursor() {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        
        if (window.matchMedia("(any-pointer: fine)").matches) {
            document.addEventListener('mousemove', (e) => {
                dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                requestAnimationFrame(() => {
                    ring.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                });
            });

            const applyHover = () => {
                document.querySelectorAll('a, button, .answer-btn, .uploader-card').forEach(el => {
                    if (el.dataset.cursorBound) return;
                    el.addEventListener('mouseenter', () => ring.classList.add('active'));
                    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
                    el.dataset.cursorBound = true;
                });
            };
            // Run on init and after DOM changes
            applyHover();
            this.applyCursorHover = applyHover;
        } else {
            this.applyCursorHover = () => {};
        }
    },

    initObservers() {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('active');
                    observer.unobserve(e.target);
                }
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
        const qIndex = appState.currentQuestion;
        if (qIndex >= QUESTIONS.length) {
            this.finishQuiz();
            return;
        }

        const q = QUESTIONS[qIndex];
        
        // Update Progress
        const pPercent = ((qIndex) / QUESTIONS.length) * 100;
        this.progressBar.style.width = `${pPercent}%`;
        this.progressText.textContent = `0${qIndex + 1} / 0${QUESTIONS.length}`;

        // Render HTML
        let html = `
            <div class="question-card" id="q-card-${qIndex}">
                <h2 class="question-title">${q.text}</h2>
                <div class="answer-grid">
        `;
        
        q.options.forEach((opt, i) => {
            html += `
                <button class="answer-btn" onclick="app.handleAnswer(${qIndex}, ${i})">
                    <span>${opt.text}</span>
                </button>
            `;
        });
        
        html += `</div></div>`;
        this.qContainer.innerHTML = html;
        this.applyCursorHover();
    },

    handleAnswer(qIndex, optIndex) {
        const option = QUESTIONS[qIndex].options[optIndex];
        
        // Accumulate impact
        for (const [trait, value] of Object.entries(option.impact)) {
            appState.scores[trait] += value;
        }

        // Animate out
        const card = document.getElementById(`q-card-${qIndex}`);
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
        card.style.transition = 'all 0.2s';
        
        setTimeout(() => {
            appState.currentQuestion++;
            this.renderQuestion();
        }, 200);
    },

    finishQuiz() {
        this.progressBar.style.width = `100%`;
        setTimeout(() => {
            this.switchView('analyzing');
            this.runTerminalAnimation();
        }, 300);
    },

    // --- TERMINAL & RESULTS ---

    runTerminalAnimation() {
        const lines = [
            "INITIATING DIAGNOSTIC PROTOCOL...",
            "ANALYZING SPENDING BEHAVIOR...",
            "CALCULATING IMPULSE DECISIONS...",
            "WARNING: SELF-CONTROL MODULE NOT FOUND",
            "CROSS-REFERENCING TERRIBLE CHOICES...",
            "PERSONALITY DETECTED."
        ];
        
        const out = document.getElementById('terminal-output');
        out.innerHTML = "";
        document.getElementById('main-ticker').classList.add('alert-mode');

        let i = 0;
        const interval = setInterval(() => {
            if (i < lines.length) {
                const p = document.createElement('div');
                p.className = 'terminal-line';
                p.textContent = `> ${lines[i]}`;
                out.appendChild(p);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => this.calculateAndShowResult(), 800);
            }
        }, 400);
    },

    calculateAndShowResult() {
        // Evaluate condition functions in order
        let foundPersonality = PERSONALITIES[PERSONALITIES.length - 1]; // Default
        for (const p of PERSONALITIES) {
            if (p.condition(appState.scores)) {
                foundPersonality = p;
                break;
            }
        }

        // Generate roast (random from options)
        const roast = foundPersonality.roasts[Math.floor(Math.random() * foundPersonality.roasts.length)];
        
        // Normalize scores for bars (0 - 100)
        // Traits usually land between -15 and +100 depending on answers.
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
        // Main headers
        document.getElementById('result-title').textContent = persona.name;
        document.getElementById('result-desc').textContent = persona.desc;
        
        // 9:16 Card
        document.getElementById('card-emoji').textContent = persona.emoji;
        document.getElementById('card-title').textContent = persona.name;
        document.getElementById('card-desc').textContent = persona.desc;
        document.getElementById('card-roast-text').textContent = `"${roast}"`;
        document.getElementById('roast-text-full').textContent = `"${roast}"`;
        
        // Small Bars on Card
        const top3Scores = [
            { label: 'CHAOS', val: scores.chaos },
            { label: 'IMPULSE', val: scores.impulse },
            { label: 'SAVING', val: scores.saving }
        ];
        
        let cardScoresHTML = '';
        top3Scores.forEach(s => {
            cardScoresHTML += `
                <div class="score-line">
                    <span class="score-name">${s.label}</span>
                    <div class="score-value-bar"><div class="score-inner" style="width: ${Math.max(10, s.val)}%;"></div></div>
                </div>
            `;
        });
        document.getElementById('card-scores').innerHTML = cardScoresHTML;

        // Big detailed Breakdown
        const allScoresList = [
            { label: 'FINANCIAL CHAOS', val: scores.chaos },
            { label: 'IMPULSE CONTROL', val: 100 - scores.impulse }, // inversed for logic
            { label: 'SAVING ABILITY', val: scores.saving },
            { label: 'FOOD DEPENDENCY', val: scores.food },
            { label: 'DIGITAL HOARDING', val: scores.digital }
        ];
        
        let breakdownHTML = '';
        allScoresList.forEach(s => {
            breakdownHTML += `
                <div class="full-score-item">
                    <div class="score-header">
                        <span>${s.label}</span>
                        <span>${Math.round(s.val)} / 100</span>
                    </div>
                    <div class="score-track">
                        <div class="score-fill" style="width: 0%;" data-target="${s.val}"></div>
                    </div>
                </div>
            `;
        });
        document.getElementById('score-breakdown').innerHTML = breakdownHTML;

        // Animate breakdown bars shortly after render
        setTimeout(() => {
            document.querySelectorAll('.score-fill').forEach(el => {
                el.style.width = el.dataset.target + '%';
            });
        }, 500);
    },

    triggerShare() {
        // Native Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'Roast My Statement',
                text: `I just took the Financial Personality test and I am ${document.getElementById('result-title').textContent}!`,
                url: window.location.href
            }).catch(console.error);
        } else {
            alert('Screenshot the card on the left to share with your friends!');
        }
    },

    resetQuiz() {
        document.getElementById('main-ticker').classList.remove('alert-mode');
        this.switchView('home');
    }
};

// Start application
app.init();
