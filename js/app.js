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
        id: "boss", name: "THE FINANCIAL BOSS", icon: "award", desc: "You have terrifyingly good control over your money.",
        condition: (scores) => scores.saving > 40 && scores.chaos < 30
    },
    {
        id: "foodie", name: "THE FOODIE MENACE", icon: "pizza", desc: "80% of your income is converted directly into calories.",
        condition: (scores) => scores.food > 30
    },
    {
        id: "goblin", name: "THE DIGITAL GOBLIN", icon: "gamepad-2", desc: "You buy pixels instead of physical possessions.",
        condition: (scores) => scores.digital > 25
    },
    {
        id: "impulse", name: "THE IMPULSE BUYER", icon: "shopping-bag", desc: "You see it. You like it. You buy it. You regret it.",
        condition: (scores) => scores.impulse > 40
    },
    {
        id: "menace", name: "THE FINANCIAL MENACE", icon: "flame", desc: "You don't spend money. You release it into the wild.",
        condition: (scores) => scores.chaos > 45 || (scores.chaos > 30 && scores.impulse > 30)
    },
    {
        id: "default", name: "THE AVERAGE SURVIVOR", icon: "circle-dashed", desc: "You are financially floating. Neither rich nor broke.",
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
    scores: { saving: 0, chaos: 0, impulse: 0, food: 0, digital: 0 },
    shareImageBlob: null
};

// ==========================================
// FINANCE MANAGER (LOCAL DASHBOARD)
// ==========================================
const financeManager = {
    data: {
        transactions: [],
        budgets: {},
        savings: []
    },
    currentDate: new Date(),

    init() {
        this.loadData();
        this.bindEvents();
    },

    loadData() {
        const stored = localStorage.getItem('roast_finance_data');
        if (stored) {
            try { this.data = JSON.parse(stored); } catch(e) { console.error('Failed to load local finance data'); }
        }
    },

    saveData() {
        localStorage.setItem('roast_finance_data', JSON.stringify(this.data));
    },

    bindEvents() {
        // CSV Dropzone in Import Modal
        const dz = document.getElementById('finance-drop-zone');
        const fi = document.getElementById('finance-csv-input');
        if(!dz || !fi) return;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
            dz.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });
        ['dragenter', 'dragover'].forEach(evt => dz.addEventListener(evt, () => dz.classList.add('dragover'), false));
        ['dragleave', 'drop'].forEach(evt => dz.addEventListener(evt, () => dz.classList.remove('dragover'), false));
        dz.addEventListener('drop', (e) => this.handleImportCSV(e.dataTransfer.files), false);
        dz.addEventListener('click', () => { fi.click(); });
        fi.addEventListener('change', (e) => { if (e.target.files) this.handleImportCSV(e.target.files); });
    },

    getMonthKey(dateObj) {
        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}`;
    },

    formatCurrency(num) {
        return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
    },

    openDashboard() {
        app.switchView('finance');
        this.render();
    },

    changeMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.render();
    },

    // --- MODALS ---
    closeModals() {
        document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden'));
    },
    
    updateCategoryOptions() {
        const type = document.getElementById('txn-type').value;
        const catSelect = document.getElementById('txn-category');
        catSelect.innerHTML = '';
        const cats = type === 'expense' 
            ? ['Food', 'Shopping', 'Transport', 'Entertainment', 'Subscriptions', 'Bills', 'Education', 'Health', 'Other']
            : ['Salary', 'Freelance', 'Gift', 'Investment', 'Other'];
        cats.forEach(c => {
            const opt = document.createElement('option');
            opt.value = c; opt.textContent = c;
            catSelect.appendChild(opt);
        });
    },

    openTxnModal(id = null) {
        this.closeModals();
        const modal = document.getElementById('finance-txn-modal');
        const form = document.getElementById('txn-form');
        document.getElementById('txn-id').value = id || '';
        
        if (id) {
            const t = this.data.transactions.find(x => x.id === id);
            if (t) {
                document.getElementById('txn-type').value = t.type;
                this.updateCategoryOptions();
                document.getElementById('txn-category').value = t.category;
                document.getElementById('txn-amount').value = t.amount;
                document.getElementById('txn-date').value = t.date;
                document.getElementById('txn-note').value = t.note || '';
            }
        } else {
            form.reset();
            document.getElementById('txn-type').value = 'expense';
            this.updateCategoryOptions();
            document.getElementById('txn-date').value = new Date().toISOString().split('T')[0];
        }
        modal.classList.remove('hidden');
    },

    openBudgetModal() {
        this.closeModals();
        document.getElementById('budget-form').reset();
        document.getElementById('finance-budget-modal').classList.remove('hidden');
    },

    openSavingsModal(id = null) {
        this.closeModals();
        document.getElementById('savings-form').reset();
        document.getElementById('savings-id').value = id || '';
        if (id) {
            const s = this.data.savings.find(x => x.id === id);
            if(s) {
                document.getElementById('savings-name').value = s.name;
                document.getElementById('savings-target').value = s.target;
                document.getElementById('savings-current').value = s.current;
            }
        }
        document.getElementById('finance-savings-modal').classList.remove('hidden');
    },

    openImportModal() {
        this.closeModals();
        document.getElementById('finance-csv-input').value = "";
        document.getElementById('finance-csv-msg').textContent = "";
        document.getElementById('finance-import-modal').classList.remove('hidden');
    },

    // --- SAVE LOGIC ---
    saveTxn() {
        const id = document.getElementById('txn-id').value;
        const t = {
            id: id || 'txn_' + Date.now(),
            type: document.getElementById('txn-type').value,
            amount: parseFloat(document.getElementById('txn-amount').value),
            category: document.getElementById('txn-category').value,
            date: document.getElementById('txn-date').value,
            note: document.getElementById('txn-note').value.trim()
        };
        if (id) {
            const idx = this.data.transactions.findIndex(x => x.id === id);
            if (idx > -1) this.data.transactions[idx] = t;
        } else {
            this.data.transactions.push(t);
        }
        this.saveData();
        this.closeModals();
        this.render();
    },

    deleteTxn(id) {
        if(confirm("Delete this transaction?")) {
            this.data.transactions = this.data.transactions.filter(x => x.id !== id);
            this.saveData();
            this.render();
        }
    },

    saveBudget() {
        const cat = document.getElementById('budget-category').value;
        const limit = parseFloat(document.getElementById('budget-amount').value);
        this.data.budgets[cat] = limit;
        if (limit <= 0) delete this.data.budgets[cat]; // remove if 0
        this.saveData();
        this.closeModals();
        this.render();
    },

    deleteBudget(cat) {
        if(confirm("Remove budget for " + cat + "?")) {
            delete this.data.budgets[cat];
            this.saveData();
            this.render();
        }
    },

    saveSavingsGoal() {
        const id = document.getElementById('savings-id').value;
        const s = {
            id: id || 'sav_' + Date.now(),
            name: document.getElementById('savings-name').value,
            target: parseFloat(document.getElementById('savings-target').value),
            current: parseFloat(document.getElementById('savings-current').value)
        };
        if(id) {
            const idx = this.data.savings.findIndex(x => x.id === id);
            if (idx > -1) this.data.savings[idx] = s;
        } else {
            this.data.savings.push(s);
        }
        this.saveData();
        this.closeModals();
        this.render();
    },

    deleteSavingsGoal(id) {
        if(confirm("Delete this savings goal?")) {
            this.data.savings = this.data.savings.filter(x => x.id !== id);
            this.saveData();
            this.render();
        }
    },

    // --- CSV BATCH IMPORT ---
    handleImportCSV(files) {
        if(!files || files.length === 0) return;
        const msg = document.getElementById('finance-csv-msg');
        msg.textContent = "Parsing CSV...";
        
        Papa.parse(files[0], {
            header: false, skipEmptyLines: true,
            complete: (results) => this.processImportData(results.data),
            error: (err) => { msg.textContent = "Error: " + err.message; }
        });
    },

    processImportData(rows) {
        const msg = document.getElementById('finance-csv-msg');
        let headerIdx = -1, maxScore = 0, columns = { date: -1, desc: -1, debit: -1, credit: -1 };
        for (let i = 0; i < Math.min(rows.length, 30); i++) {
            let score = 0, temp = { date:-1, desc:-1, debit:-1, credit:-1 };
            rows[i].forEach((c, idx) => {
                const s = String(c).toLowerCase();
                if(temp.date === -1 && /(date|txn date|value date)/.test(s)) { score++; temp.date = idx; }
                else if(temp.desc === -1 && /(description|narration|remarks)/.test(s)) { score++; temp.desc = idx; }
                else if(temp.debit === -1 && /(debit|withdrawal|dr|out|amount)/.test(s)) { score++; temp.debit = idx; }
                else if(temp.credit === -1 && /(credit|deposit|cr|in)/.test(s)) { score++; temp.credit = idx; }
            });
            if(score > maxScore) { maxScore = score; headerIdx = i; columns = temp; }
        }

        if(headerIdx === -1 || maxScore < 2) {
            msg.textContent = "Could not map columns. Required: Date, Description, Amount."; return;
        }

        let imported = 0;
        for (let i = headerIdx + 1; i < rows.length; i++) {
            const row = rows[i];
            if (!row[columns.date] && !row[columns.desc]) continue;
            
            const pAm = (val) => {
                if(!val) return 0;
                const v = parseFloat(String(val).replace(/[^0-9.-]+/g, ""));
                return isNaN(v) ? 0 : Math.abs(v);
            };

            let deb = columns.debit !== -1 ? pAm(row[columns.debit]) : 0;
            let cred = columns.credit !== -1 ? pAm(row[columns.credit]) : 0;
            
            if (columns.debit !== -1 && columns.credit === -1) {
                const num = parseFloat(String(row[columns.debit]).replace(/[^\d.-]/g, ''));
                if (num < 0) { deb = Math.abs(num); cred = 0; }
                else if (num > 0) { cred = num; deb = 0; }
            }

            if(deb > 0 || cred > 0) {
                // Determine cat naive
                let cat = 'Other'; let type = deb > 0 ? 'expense' : 'income';
                let desc = String(row[columns.desc] || "").trim();
                let dL = desc.toLowerCase();
                if(type === 'expense') {
                    if(/(zomato|swiggy|uber eats|mcdonalds|starbucks|cafe|restaurant|food)/.test(dL)) cat = 'Food';
                    else if(/(amazon|flipkart|myntra|zara|h&m)/.test(dL)) cat = 'Shopping';
                    else if(/(uber|ola|rapido|metro|petrol|fuel)/.test(dL)) cat = 'Transport';
                    else if(/(netflix|spotify|prime|hotstar|apple|google|subscription)/.test(dL)) cat = 'Subscriptions';
                    else if(/(movie|pvr|bookmyshow)/.test(dL)) cat = 'Entertainment';
                    else if(/(electricity|water|wifi|jio|airtel|bill)/.test(dL)) cat = 'Bills';
                    else if(/(pharmacy|hospital|apollo|clinic)/.test(dL)) cat = 'Health';
                } else {
                    if(/(salary|payroll|wages)/.test(dL)) cat = 'Salary';
                }

                // Date parse (naive)
                let dStr = row[columns.date] ? String(row[columns.date]) : new Date().toISOString().split('T')[0];
                // basic cleanup just in case it's dd-mm-yyyy or something.
                if(dStr.match(/^\d{2}[\/\-]\d{2}[\/\-]\d{4}/)) {
                    let pts = dStr.split(/[\/\-]/);
                    dStr = `${pts[2]}-${pts[1]}-${pts[0]}`;
                }

                this.data.transactions.push({
                    id: 'imp_' + Date.now() + '_' + i,
                    type: type,
                    amount: deb > 0 ? deb : cred,
                    category: cat,
                    date: dStr,
                    note: desc.substring(0, 30)
                });
                imported++;
            }
        }

        if(imported > 0) {
            this.saveData();
            this.closeModals();
            this.render();
            alert(`Successfully imported ${imported} transactions!`);
        } else {
            msg.textContent = "No valid transactions found.";
        }
    },

    // --- RENDER LOGIC ---
    render() {
        const monthNames = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        const curM = this.currentDate.getMonth();
        const curY = this.currentDate.getFullYear();
        document.getElementById('finance-month-display').textContent = `${monthNames[curM]} ${curY}`;

        // Empty state check
        if (this.data.transactions.length === 0 && this.data.savings.length === 0 && Object.keys(this.data.budgets).length === 0) {
            document.getElementById('finance-empty-state').classList.remove('hidden');
            document.getElementById('finance-dashboard-content').classList.add('hidden');
            return;
        }

        document.getElementById('finance-empty-state').classList.add('hidden');
        document.getElementById('finance-dashboard-content').classList.remove('hidden');

        // Filter current month txns
        const mKey = this.getMonthKey(this.currentDate);
        const monthTxns = this.data.transactions.filter(t => t.date.startsWith(mKey)).sort((a,b) => new Date(b.date) - new Date(a.date));

        // KPIs
        let tInc = 0, tExp = 0;
        const catSpent = {};
        monthTxns.forEach(t => {
            if (t.type === 'income') tInc += t.amount;
            else { 
                tExp += t.amount; 
                catSpent[t.category] = (catSpent[t.category] || 0) + t.amount;
            }
        });

        document.getElementById('kpi-income').textContent = this.formatCurrency(tInc);
        document.getElementById('kpi-spent').textContent = this.formatCurrency(tExp);
        document.getElementById('kpi-remaining').textContent = this.formatCurrency(tInc - tExp);
        
        let sRate = tInc > 0 ? Math.max(0, Math.round(((tInc - tExp) / tInc) * 100)) : 0;
        document.getElementById('kpi-rate').textContent = sRate + '%';

        // Render List
        const listC = document.getElementById('txn-list-container');
        listC.innerHTML = monthTxns.length === 0 ? '<p class="text-muted">No transactions this month.</p>' : '';
        
        const getIcon = (cat) => {
            const map = { 'Food': 'pizza', 'Shopping': 'shopping-bag', 'Transport': 'car', 'Entertainment': 'film', 'Subscriptions': 'monitor-play', 'Bills': 'receipt', 'Health': 'heart-pulse', 'Education': 'book-open', 'Salary': 'briefcase' };
            return map[cat] || 'circle-dashed';
        };

        // Render top 10
        monthTxns.slice(0, 10).forEach(t => {
            listC.innerHTML += `
                <div class="txn-item">
                    <div class="txn-left">
                        <div class="txn-icon"><i data-lucide="${getIcon(t.category)}" style="width:20px;height:20px;"></i></div>
                        <div class="txn-details">
                            <span class="txn-title">${t.category}</span>
                            <span class="txn-date">${t.date} ${t.note ? '• ' + t.note : ''}</span>
                        </div>
                    </div>
                    <div class="txn-right">
                        <span class="txn-amount ${t.type}">${t.type === 'income' ? '+' : '-'}${this.formatCurrency(t.amount)}</span>
                        <div class="txn-actions">
                            <button onclick="app.finance.openTxnModal('${t.id}')"><i data-lucide="edit-2" style="width:16px;"></i></button>
                            <button onclick="app.finance.deleteTxn('${t.id}')"><i data-lucide="trash-2" style="width:16px;"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Render Budgets
        const budC = document.getElementById('budget-list-container');
        budC.innerHTML = Object.keys(this.data.budgets).length === 0 ? '<p class="text-muted">No budgets set.</p>' : '';
        let overBudgetCount = 0;
        
        for (const [cat, limit] of Object.entries(this.data.budgets)) {
            const spent = catSpent[cat] || 0;
            const pct = Math.min(100, Math.round((spent / limit) * 100));
            const isOver = spent > limit;
            if(isOver) overBudgetCount++;

            let roastHtml = '';
            if (isOver && window.ROAST_LIBRARY && window.ROAST_LIBRARY.budget) {
                const bk = cat.toLowerCase();
                const dict = window.ROAST_LIBRARY.budget[bk] || window.ROAST_LIBRARY.budget.general;
                const rText = dict[Math.floor(Math.random()*dict.length)];
                roastHtml = `<div class="budget-overrun tech-mono"><strong class="text-danger">> OVER BUDGET:</strong> ${rText}</div>`;
            }

            budC.innerHTML += `
                <div class="budget-item">
                    <div class="budget-header">
                        <span class="budget-title"><i data-lucide="${getIcon(cat)}" style="width:16px;"></i> ${cat}</span>
                        <span class="budget-stats ${isOver ? 'text-danger':''}">${this.formatCurrency(spent)} / ${this.formatCurrency(limit)}</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${pct}%; background: ${isOver ? 'var(--accent-danger)' : 'var(--accent-acid)'};"></div>
                    </div>
                    ${roastHtml}
                    <div style="text-align:right; margin-top:0.25rem;"><button class="tech-mono text-muted" style="background:none;border:none;cursor:pointer;font-size:0.7rem;" onclick="app.finance.deleteBudget('${cat}')">REMOVE</button></div>
                </div>
            `;
        }

        // Render Savings
        const savC = document.getElementById('savings-list-container');
        savC.innerHTML = this.data.savings.length === 0 ? '<p class="text-muted">No savings goals set.</p>' : '';
        this.data.savings.forEach(s => {
            const pct = Math.min(100, Math.round((s.current / s.target) * 100));
            savC.innerHTML += `
                <div class="savings-item">
                    <div class="savings-header">
                        <span class="savings-title">${s.name}</span>
                        <span class="savings-stats">${this.formatCurrency(s.current)} / ${this.formatCurrency(s.target)}</span>
                    </div>
                    <div class="progress-bar-bg">
                        <div class="progress-bar-fill" style="width: ${pct}%; background: #00ff66;"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-top:0.25rem;">
                        <span class="tech-mono" style="font-size:0.7rem; color:#00ff66;">${pct}% COMPLETED</span>
                        <div>
                            <button class="tech-mono text-muted" style="background:none;border:none;cursor:pointer;font-size:0.7rem;margin-right:10px;" onclick="app.finance.openSavingsModal('${s.id}')">EDIT</button>
                            <button class="tech-mono text-muted" style="background:none;border:none;cursor:pointer;font-size:0.7rem;" onclick="app.finance.deleteSavingsGoal('${s.id}')">DELETE</button>
                        </div>
                    </div>
                </div>
            `;
        });

        // Render Insights & Chaos Score
        const insC = document.getElementById('finance-insights-content');
        if (monthTxns.length === 0) {
            insC.innerHTML = '<p class="text-muted">Add transactions to generate insights.</p>';
            document.getElementById('live-chaos-score').textContent = '0 / 100';
        } else {
            // Find biggest drain
            let topCat = null, topAmt = 0;
            for(const [c, a] of Object.entries(catSpent)) {
                if(a > topAmt) { topAmt = a; topCat = c; }
            }

            let insHtml = '';
            if (topCat) {
                insHtml += `
                    <p class="tech-mono text-muted mb-2">BIGGEST MONEY DRAIN</p>
                    <p style="font-size:1.1rem; margin-bottom:1rem;"><strong class="highlight-acid">${topCat}</strong> — ${this.formatCurrency(topAmt)}</p>
                `;
            }
            if (sRate < 10 && tExp > 0) {
                insHtml += `<p class="tech-mono" style="color:var(--accent-danger);">>> CRITICAL: Saving rate is abysmal.</p>`;
            } else if (sRate > 30) {
                insHtml += `<p class="tech-mono" style="color:#00ff66;">>> RARE: Actually saving money. Good job.</p>`;
            }
            insC.innerHTML = insHtml;

            // Live Chaos Score logic
            let chaos = 20; // base
            if (sRate < 10) chaos += 30;
            else if (sRate < 20) chaos += 15;
            chaos += (overBudgetCount * 15);
            if (tExp > tInc) chaos += 30;
            let ratio = tInc > 0 ? (tExp / tInc) : 1;
            if (ratio > 0.8 && ratio <= 1) chaos += 10;
            chaos = Math.min(100, Math.max(0, Math.round(chaos)));
            
            const liveC = document.getElementById('live-chaos-score');
            liveC.textContent = `${chaos} / 100`;
            liveC.style.color = chaos > 70 ? 'var(--accent-danger)' : (chaos > 40 ? 'var(--accent-acid)' : '#00ff66');
        }

        if(window.lucide) window.lucide.createIcons();
    }
};

const defaultAvatarSvg = 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%20fill%3D%22none%22%20stroke%3D%22%238E93A4%22%20stroke-width%3D%224%22%3E%3Crect%20x%3D%2210%22%20y%3D%2210%22%20width%3D%2280%22%20height%3D%2280%22%20rx%3D%2210%22%20%2F%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2240%22%20r%3D%2215%22%20%2F%3E%3Cpath%20d%3D%22M20%2090%20Q50%2060%2080%2090%22%20%2F%3E%3C%2Fsvg%3E';

const settingsManager = {
    settings: {
        avatar: null,
        displayName: '',
        showAvatar: true,
        showName: true
    },
    cropperInstance: null,

    init() {
        this.loadProfile();
        this.bindEvents();
    },

    loadProfile() {
        const stored = localStorage.getItem('roast_settings');
        if (stored) {
            try { this.settings = JSON.parse(stored); } catch(e) {}
        }
        this.syncUI();
    },

    saveProfile() {
        this.settings.displayName = document.getElementById('settings-display-name').value.trim();
        this.settings.showAvatar = document.getElementById('settings-show-avatar').checked;
        this.settings.showName = document.getElementById('settings-show-name').checked;
        localStorage.setItem('roast_settings', JSON.stringify(this.settings));
    },

    syncUI() {
        const avPath = this.settings.avatar || defaultAvatarSvg;
        document.getElementById('settings-avatar-preview').src = avPath;
        document.getElementById('settings-display-name').value = this.settings.displayName;
        document.getElementById('settings-show-avatar').checked = this.settings.showAvatar;
        document.getElementById('settings-show-name').checked = this.settings.showName;
    },

    bindEvents() {
        document.getElementById('avatar-upload-input').addEventListener('change', (e) => this.handleImageSelect(e));
    },

    openSettings() {
        app.switchView('settings');
    },

    handleImageSelect(e) {
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.openCropper(event.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        e.target.value = ''; // reset so same file can fire change again
    },

    openCropper(imgSrc) {
        const modal = document.getElementById('cropper-modal');
        const img = document.getElementById('cropper-image');
        img.src = imgSrc;
        modal.classList.remove('hidden');

        if(this.cropperInstance) this.cropperInstance.destroy();
        
        setTimeout(() => {
            if(window.Cropper) {
                this.cropperInstance = new Cropper(img, {
                    aspectRatio: 1,
                    viewMode: 1,
                    dragMode: 'move',
                    autoCropArea: 0.8,
                    background: false,
                    guides: false,
                    highlight: false
                });
            }
        }, 100);
    },

    closeCropper() {
        document.getElementById('cropper-modal').classList.add('hidden');
        if(this.cropperInstance) this.cropperInstance.destroy();
    },

    cropImage() {
        if(!this.cropperInstance) return;
        const canvas = this.cropperInstance.getCroppedCanvas({ width: 300, height: 300 });
        if(canvas) {
            const base64 = canvas.toDataURL('image/jpeg', 0.8);
            this.settings.avatar = base64;
            this.saveProfile();
            this.syncUI();
            this.closeCropper();
        }
    },

    removeAvatar() {
        this.settings.avatar = null;
        this.saveProfile();
        this.syncUI();
    },

    exportData() {
        const payload = {
            version: "1.2",
            settings: this.settings,
            finance: localStorage.getItem('roast_finance_data') ? JSON.parse(localStorage.getItem('roast_finance_data')) : null,
            quizState: appState.scores
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `roast_my_statement_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    },

    importData(e) {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if(data.settings) {
                    this.settings = data.settings;
                    this.saveProfile();
                    this.syncUI();
                }
                if(data.finance) {
                    localStorage.setItem('roast_finance_data', JSON.stringify(data.finance));
                    if(app.finance) app.finance.loadData();
                }
                alert("Data successfully imported!");
            } catch(err) {
                alert("Failed to parse import file.");
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    },

    resetFinanceData() {
        if(confirm("Are you absolutely sure you want to completely wipe all transactions, budgets, and savings? This cannot be undone.")) {
            localStorage.removeItem('roast_finance_data');
            if(app.finance) {
                app.finance.data = { transactions: [], budgets: {}, savings: [] };
                app.finance.render();
            }
            alert("Financial data wiped.");
        }
    },

    resetEverything() {
        if(confirm("CRITICAL WARNING: This will completely wipe all avatars, display names, and financial data locally on this device. Proceed?")) {
            localStorage.removeItem('roast_finance_data');
            localStorage.removeItem('roast_settings');
            location.reload();
        }
    }
};

// ==========================================
// ANDROID NATIVE INTEGRATION
// ==========================================
window.handleAndroidBack = function() {
    if (window.androidOnboarding && window.androidOnboarding.isActive) {
        return window.androidOnboarding.handleBack();
    }
    const modals = Array.from(document.querySelectorAll('.modal:not(.hidden)'));
    if (modals.length > 0) {
        const topModal = modals[modals.length - 1];
        if (topModal.id === 'cropper-modal' && app.settings) {
            app.settings.closeCropper();
        } else if (app.finance && topModal.id.startsWith('finance')) {
            app.finance.closeModals();
        } else {
            topModal.classList.add('hidden');
        }
        return true;
    }

    const activeView = document.querySelector('.view.active');
    if (activeView && activeView.id !== 'view-home') {
        if (activeView.id === 'view-quiz') {
            if (appState.currentQuestion > 0) {
                appState.currentQuestion--;
                app.renderQuestion();
                return true;
            } else {
                if(confirm("Cancel quiz and go back to menu?")) app.resetQuiz();
            }
        } else if(activeView.id === 'view-analyzing') {
            return true; // Block backing out during loading terminal
        } else {
            app.switchView('home');
        }
        return true;
    }
    return false;
};

// Execute Android specific injections safely if running natively
if (window.Capacitor && window.Capacitor.getPlatform() === 'android') {
    // --- ANDROID ONBOARDING ---
    window.androidOnboarding = {
        slideIndex: 0,
        isActive: false,
        init() {
            if (localStorage.getItem('roast_onboarding_done') === 'true') return false;
            this.isActive = true;
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    const home = document.getElementById('view-home');
                    if(home) { home.classList.add('hidden'); home.classList.remove('active'); }
                    const nav = document.querySelector('.navbar');
                    if(nav) nav.style.display = 'none';
                    const botNav = document.querySelector('.android-bottom-nav');
                    if(botNav) botNav.style.display = 'none';
                    
                    this.injectUI();
                    this.bindEvents();
                }, 50);
            });
            return true;
        },
        injectUI() {
            const obHTML = `
                <section id="view-onboarding" class="view active" style="position:fixed; inset:0; z-index:9999; background:var(--bg-base); display:flex; flex-direction:column; padding-top:env(safe-area-inset-top); padding-bottom:env(safe-area-inset-bottom);">
                    <div style="display:flex; justify-content:flex-end; padding:1.5rem;">
                        <button id="btn-ob-skip" class="tech-mono text-muted" style="background:none; border:none; padding:0.5rem; font-size:0.85rem; cursor:pointer;">SKIP</button>
                    </div>
                    
                    <div id="ob-slides" style="flex:1; position:relative; overflow:hidden; display:flex;">
                        <!-- Slide 1 -->
                        <div class="ob-slide fade-in active" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;  width:100%;">
                            <h1 class="huge-title" style=""><span class="highlight-acid skew-text">WHAT KIND OF</span><br>SPENDER ARE YOU?</h1>
                            <p class="text-muted mt-4">Discover your financial personality, get your chaos score, and find out exactly how badly we can roast you.</p>
                            <div class="glossy-panel mt-4" style="width:160px; height:200px; display:flex; flex-direction:column; align-items:center; justify-content:center; opacity:0.8; border-radius:12px;">
                                <i data-lucide="scan-line" style="width:48px;height:48px;color:var(--accent-acid);margin-bottom:1rem;"></i>
                                <div style="width:80%;height:4px;background:rgba(255,255,255,0.2);border-radius:2px;margin-bottom:0.5rem;"></div>
                                <div style="width:60%;height:4px;background:rgba(255,255,255,0.2);border-radius:2px;"></div>
                            </div>
                        </div>
                        
                        <!-- Slide 2 -->
                        <div class="ob-slide fade-in hidden" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;  width:100%;">
                            <h1 class="huge-title" style="">YOUR MONEY HAS<br><span class="highlight-acid skew-text">A PERSONALITY.</span></h1>
                            <p class="text-muted mt-4">Answer a few quick questions and we'll identify your financial personality.</p>
                            <div class="glossy-panel mt-4" style="padding:1.5rem; width:100%; max-width:280px; text-align:left; border-radius:8px;">
                                <div class="tech-mono highlight-acid mb-2" style="font-size:0.7rem;">FINANCIAL CHAOS — 92/100</div>
                                <h2 style="font-size:1.2rem; margin-bottom:0.5rem; font-family:var(--font-display); font-weight:900;">THE FINANCIAL MENACE</h2>
                                <p style="font-size:0.85rem; font-style:italic; color:var(--text-muted);">"Your wallet doesn't have a spending problem. It has a survival problem."</p>
                            </div>
                        </div>
                        
                        <!-- Slide 3 -->
                        <div class="ob-slide fade-in hidden" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;  width:100%;">
                            <h1 class="huge-title" style="">YOUR DATA<br><span class="highlight-acid skew-text">STAYS YOURS.</span></h1>
                            <p class="text-muted mt-4 mb-4">Your quiz answers and financial data are processed locally on your device.</p>
                            <div class="status-dot safe" style="width:24px;height:24px; box-shadow:0 0 20px #00ff66; margin:0 auto 1rem;"></div>
                            <div class="tech-mono" style="color:#00ff66;">100% LOCAL PROCESSING</div>
                        </div>
                    </div>
                    
                    <div style=" display:flex; flex-direction:column; align-items:center; gap:1.5rem;">
                        <div class="ob-dots" style="display:flex; gap:0.5rem;">
                            <div class="ob-dot" style="width:8px;height:8px;border-radius:50%;background:var(--accent-acid);"></div>
                            <div class="ob-dot" style="width:8px;height:8px;border-radius:50%;background:var(--border-light);"></div>
                            <div class="ob-dot" style="width:8px;height:8px;border-radius:50%;background:var(--border-light);"></div>
                        </div>
                        <button id="btn-ob-main" class="action-button primary-cta w-full pulse-glow"><span>NEXT</span></button>
                    </div>
                </section>
            `;
            document.body.insertAdjacentHTML('beforeend', obHTML);
            if (window.lucide) window.lucide.createIcons();
        },
        goToSlide(index) {
            const slides = document.querySelectorAll('.ob-slide');
            const dots = document.querySelectorAll('.ob-dot');
            const btnSpan = document.querySelector('#btn-ob-main span');
            
            slides[this.slideIndex].classList.add('hidden');
            slides[this.slideIndex].classList.remove('active');
            dots[this.slideIndex].style.background = 'var(--border-light)';
            
            this.slideIndex = index;
            
            slides[this.slideIndex].classList.remove('hidden');
            slides[this.slideIndex].classList.add('active');
            dots[this.slideIndex].style.background = 'var(--accent-acid)';
            
            btnSpan.textContent = this.slideIndex === 2 ? 'GET STARTED' : 'NEXT';
        },
        bindEvents() {
            document.getElementById('btn-ob-main').onclick = () => {
                if (this.slideIndex < 2) this.goToSlide(this.slideIndex + 1);
                else this.finish();
            };
            document.getElementById('btn-ob-skip').onclick = () => this.finish();
        },
        finish() {
            localStorage.setItem('roast_onboarding_done', 'true');
            this.isActive = false;
            
            // Smooth exit transition instead of instant removal
            const obView = document.getElementById('view-onboarding');
            if (obView) {
                obView.style.opacity = '0';
                obView.style.transition = 'opacity 0.3s ease';
                setTimeout(() => obView.remove(), 350);
            }
            
            const botNav = document.querySelector('.android-bottom-nav');
            if (botNav) botNav.style.display = 'flex';
            
            app.scrollState = app.scrollState || {};
            app.scrollState['view-home'] = 0; // Force home top
            app.switchView('home');

            // Force reflow safely
            setTimeout(() => {
                window.scrollTo(0, 0);
                const home = document.getElementById('view-home');
                if (home) {
                    home.classList.add('active'); 
                }
                
                document.querySelectorAll('.reveal').forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight + 100) el.classList.add('active');
                });
                window.dispatchEvent(new Event('resize'));
            }, 50);
        },
        handleBack() {
             if (this.slideIndex > 0) {
                 this.goToSlide(this.slideIndex - 1);
                 return true;
             }
             // Returns false, which allows normal exit
             return false;
        }
    };
    window.androidOnboarding.init();

    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('android-native-app');
        
        // Inject Bottom Navigation
        const bottomNav = document.createElement('div');
        bottomNav.className = 'android-bottom-nav';
        bottomNav.innerHTML = `
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
        `;
        document.body.appendChild(bottomNav);

        // Map View Switches to update the bottom nav active state
        app.scrollState = app.scrollState || {};
        app.switchView = function(viewName) {
            // Save scroll state before hiding
            const currentView = document.querySelector('.view:not(.hidden)');
            if (currentView) {
                app.scrollState[currentView.id] = window.scrollY;
            }
            
            // Execute view switch natively
            Object.values(app.views).forEach(v => v.classList.add('hidden'));
            app.views[viewName].classList.remove('hidden');

            // Find new scroll
            const newId = app.views[viewName].id;
            const targetScroll = app.scrollState[newId] || 0;
            
            // Delay rendering frames to flush stale DOM states and flash issues
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    window.scrollTo(0, targetScroll);
                    // Revalidate animations dynamically
                    document.querySelectorAll('.reveal').forEach(el => {
                        if (el.getBoundingClientRect().top < window.innerHeight) {
                            el.classList.add('active');
                        }
                    });
                    window.dispatchEvent(new Event('resize'));
                });
            });

            // Update Nav Tabs safely
            document.querySelectorAll('.android-bottom-nav .nav-tab').forEach(btn => btn.classList.remove('active'));
            let targetTab = 'home';
            if (viewName === 'finance') targetTab = 'finance';
            if (viewName === 'settings') targetTab = 'settings';
            const tgt = document.querySelector(`.android-bottom-nav .nav-tab[data-target="${targetTab}"]`);
            if (tgt) tgt.classList.add('active');
        };

        // Inject Native "SAVE IMAGE" Button directly alongside Share Button on Results Screen
        const actionStack = document.querySelector('.action-buttons-stack');
        if (actionStack) {
            const saveBtn = document.createElement('button');
            saveBtn.className = 'action-button subtle outline mt-2 w-full';
            saveBtn.innerHTML = '<span>SAVE IMAGE</span>';
            saveBtn.onclick = () => {
                if (appState.shareImageBlob && window.AndroidNativeBridge) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        window.AndroidNativeBridge.saveImageToGallery(reader.result);
                        const span = saveBtn.querySelector('span');
                        span.textContent = 'IMAGE SAVED ✓';
                        setTimeout(() => span.textContent = 'SAVE IMAGE', 2000);
                    };
                    reader.readAsDataURL(appState.shareImageBlob);
                } else {
                    app.shareResult(); // Fallback to normal flow if bridge fails
                }
            };
            actionStack.insertBefore(saveBtn, document.getElementById('btn-restart'));
        }

        // Inject Dev Reset Onboarding Button inside Danger Zone
        const dangerRows = document.querySelector('#view-settings .text-danger');
        if (dangerRows && dangerRows.nextElementSibling) {
             const resetObBtn = document.createElement('button');
             resetObBtn.className = 'action-button outline mt-2 w-full';
             resetObBtn.style.color = '#fff';
             resetObBtn.innerHTML = '<span>RESET ONBOARDING (DEV)</span>';
             resetObBtn.onclick = () => {
                 localStorage.removeItem('roast_onboarding_done');
                 alert('Onboarding status reset. Restart app to see the onboarding flow.');
             };
             dangerRows.nextElementSibling.insertAdjacentElement('afterend', resetObBtn);
        }
        
        if (window.lucide) window.lucide.createIcons();
    });
}

const app = {
    views: {},
    
    init() {
        this.cacheDOM();
        this.checkChallengeURL(); // Check for viral loop params
        this.bindEvents();
        this.initCursor();
          this.initObservers();
          if(this.finance) this.finance.init();
          if(this.settings) this.settings.init();
          if(window.lucide) { window.lucide.createIcons(); }
      },

    cacheDOM() {
        this.views = {
            home: document.getElementById('view-home'),
            quiz: document.getElementById('view-quiz'),
            analyzing: document.getElementById('view-analyzing'),
              result: document.getElementById('view-result'),
              csvResult: document.getElementById('view-csv-result'),
              finance: document.getElementById('view-finance'),
              settings: document.getElementById('view-settings')
          };
        this.qContainer = document.getElementById('question-container');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');
        this.modal = document.getElementById('challenge-modal');
        this.inputFriendName = document.getElementById('friend-name');
        
        // CSV Elements
        this.csvDropZone = document.getElementById('drop-zone');
        this.csvInput = document.getElementById('file-input');
        this.csvUploaderUI = document.getElementById('uploader-ui');
        this.csvSuccessUI = document.getElementById('uploader-success-ui');
        this.csvFileName = document.getElementById('selected-file-name');
        this.csvErrorMsg = document.getElementById('csv-error-msg');
        this.csvSysMsg = document.getElementById('csv-sys-msg');
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

        // CSV Uploader Events
        const dz = this.csvDropZone;
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
            window.addEventListener(evt, (e) => { e.preventDefault(); e.stopPropagation(); }, false);
        });
        ['dragenter', 'dragover'].forEach(evt => dz.addEventListener(evt, () => dz.classList.add('dragover'), false));
        ['dragleave', 'drop'].forEach(evt => dz.addEventListener(evt, () => dz.classList.remove('dragover'), false));
        dz.addEventListener('drop', (e) => this.handleCSVFiles(e.dataTransfer.files), false);
        dz.addEventListener('click', () => { if (this.csvSuccessUI.classList.contains('hidden')) this.csvInput.click(); });
        this.csvInput.addEventListener('change', (e) => { if (e.target.files) this.handleCSVFiles(e.target.files); });
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

        // Reset image/html visibility states for re-renders
        const existingImg = document.getElementById('generated-share-img');
        if (existingImg) existingImg.remove();
        document.getElementById('share-card-element').style.display = 'flex';

        // Calculate a main aggregated Financial Score (e.g., Chaos + Impulse - Saving)
        // Scaled to 0-100 logically
        let mainScore = Math.round((scores.chaos * 1.2 + scores.impulse * 0.8 + (100 - scores.saving)) / 3);
        mainScore = Math.min(100, Math.max(0, mainScore));
        const scoreString = `FINANCIAL CHAOS — ${mainScore}/100`;

        document.getElementById('result-title').textContent = persona.name;
        document.getElementById('result-desc').textContent = persona.desc;
        document.getElementById('header-main-score').textContent = scoreString;

        // Apply Avatar and Name from Settings
        const s = this.settings ? this.settings.settings : null;
        if(s && s.showAvatar) {
            document.getElementById('card-avatar-box').classList.remove('hidden');
            document.getElementById('card-avatar-img').src = s.avatar || defaultAvatarSvg;
        } else {
            document.getElementById('card-avatar-box').classList.add('hidden');
        }

        const nameEl = document.getElementById('card-display-name');
        if(s && s.showName && s.displayName) {
            nameEl.textContent = s.displayName.toUpperCase();
            nameEl.classList.remove('hidden');
        } else {
            nameEl.textContent = '';
            nameEl.classList.add('hidden');
        }

        // Populate Card
        document.getElementById('card-icon').innerHTML = `<i data-lucide="${persona.icon}" style="width:16px; height:16px;"></i>`;
        document.getElementById('card-title').textContent = persona.name;
        document.getElementById('card-desc').textContent = persona.desc;
        document.getElementById('card-main-score').textContent = scoreString;
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
        
        // Render lucide icons
        if(window.lucide) { window.lucide.createIcons(); }

        setTimeout(() => document.querySelectorAll('.score-fill').forEach(el => el.style.width = el.dataset.target + '%'), 500);

        // Generate Image after DOM settles
        setTimeout(() => this.generateShareImage(), 800);
    },

    generateShareImage() {
        const cardTarget = document.getElementById('share-card-element');
        if (!window.html2canvas) return;
        
        // Ensure any previous generated image is removed
        const existingImg = document.getElementById('generated-share-img');
        if (existingImg) existingImg.remove();
        
        // Make the original HTML card visible for canvas rendering
        cardTarget.style.display = 'flex';
        
        // Standardize card for image generation to avoid glitches
        const originalTransform = cardTarget.style.transform;
        cardTarget.style.transform = 'none';

        html2canvas(cardTarget, {
            scale: 2,
            backgroundColor: '#0A0A0C', // Fallback base color
            useCORS: true,
            logging: false
        }).then(canvas => {
            cardTarget.style.transform = originalTransform;
            canvas.toBlob(blob => {
                appState.shareImageBlob = blob;
                this.updateShareButton();
                
                // UX UPGRADE: Overlay the generated image so users can natively long-press to save on mobile
                const imgUrl = URL.createObjectURL(blob);
                const imgElement = document.createElement('img');
                imgElement.id = 'generated-share-img';
                imgElement.src = imgUrl;
                imgElement.className = 'share-card';
                imgElement.style.width = '100%';
                imgElement.style.display = 'block';
                imgElement.style.objectFit = 'contain';
                imgElement.style.position = 'relative';
                imgElement.style.zIndex = '50';
                imgElement.alt = 'Financial Personality Share Card';
                
                // Hide the HTML card and show the PNG Image
                cardTarget.style.display = 'none';
                cardTarget.parentNode.appendChild(imgElement);

            }, 'image/png');
        }).catch(err => console.error('Image generation failed', err));
    },

    updateShareButton() {
        const btn = document.getElementById('btn-share-result-text');
        if (appState.shareImageBlob && navigator.canShare) {
            const file = new File([appState.shareImageBlob], 'roast-my-statement.png', { type: 'image/png' });
            if (!navigator.canShare({ files: [file] })) {
                btn.textContent = "DOWNLOAD IMAGE";
            } else {
                btn.textContent = "SHARE MY PERSONALITY";
            }
        } else {
            btn.textContent = "DOWNLOAD IMAGE";
        }
    },

    shareResult() {
        if (!appState.shareImageBlob) {
            alert('Image is still generating or failed. Please screenshot the card!');
            return;
        }

        const file = new File([appState.shareImageBlob], 'roast-my-statement.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({
                title: 'Roast My Statement',
                text: `I just took the Financial Personality test and got diagnosed as ${document.getElementById('result-title').textContent}!`,
                files: [file]
            }).catch(console.error);
        } else {
            // Fallback download
            const url = URL.createObjectURL(appState.shareImageBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'roast-my-statement.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    },

    resetQuiz() {
        // Strip URL param without reload
        if (window.history.replaceState) { window.history.replaceState(null, '', window.location.pathname); }
        appState.isChallenged = false; appState.challengerName = null;
        
        document.getElementById('hero-title-text').innerHTML = `WHAT KIND OF <br><span class="highlight-acid skew-text">SPENDER ARE YOU?</span>`;
        document.getElementById('hero-subtitle-text').textContent = "Answer a few questions. Discover your financial personality. Get roasted abruptly and brutally. (100% Local)";
        document.getElementById('btn-start-span').textContent = "DISCOVER MY PERSONALITY";
        document.getElementById('legacy-uploader').classList.add('hidden');
        document.getElementById('challenge-accepted-msg').classList.add('hidden');
        document.getElementById('normal-diagnosis-msg').classList.remove('hidden');
        document.getElementById('main-ticker').classList.remove('alert-mode');
        
        // Reset CSV UI
        this.csvErrorMsg.textContent = "";
        this.csvUploaderUI.classList.remove('hidden');
        this.csvSuccessUI.classList.add('hidden');
        this.csvInput.value = "";
        
        this.switchView('home');
    },

    // --- CSV ENGINE ---
    handleCSVFiles(files) {
        if (!files || files.length === 0) return;
        const file = files[0];
        
        this.csvErrorMsg.textContent = "";

        if (file.type !== 'text/csv' && !file.name.toLowerCase().endsWith('.csv')) {
            this.csvErrorMsg.textContent = "Error: Please upload a valid .csv file.";
            return;
        }

        // Show Success UI
        this.csvFileName.textContent = file.name;
        this.csvUploaderUI.classList.add('hidden');
        this.csvSuccessUI.classList.remove('hidden');
        this.csvDropZone.style.cursor = 'default';
        if (this.applyCursorHover) document.getElementById('cursor-ring').classList.remove('active');

        // Typewriter effect
        const msg = this.csvSysMsg;
        const oText = "> Statement accepted. Initializing PapaParse engine...";
        msg.textContent = '';
        let i = 0;
        const tw = setInterval(() => {
            if (i < oText.length) { msg.textContent += oText.charAt(i); i++; }
            else { clearInterval(tw); this.parseCSVFile(file); }
        }, 20);
    },

    parseCSVFile(file) {
        if (typeof Papa === 'undefined') {
            this.csvSysMsg.textContent = "> ERROR: Parser library missing.";
            return;
        }
        
        this.csvSysMsg.textContent = "> Extracting transaction rows...";
        
        Papa.parse(file, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => {
                this.processCSVData(results.data);
            },
            error: (err) => {
                this.csvSysMsg.textContent = "> ERROR: " + err.message;
            }
        });
    },

    processCSVData(rows) {
        if (!rows || rows.length === 0) {
            this.csvSysMsg.textContent = "> ERROR: File is empty.";
            return;
        }

        // 1. Find the header row by searching for common bank keywords
        let headerIdx = -1;
        let maxScore = 0;
        let columns = { date: -1, desc: -1, debit: -1, credit: -1 };

        // Search first 30 rows
        for (let i = 0; i < Math.min(rows.length, 30); i++) {
            const row = rows[i];
            let score = 0;
            let tempCols = { date: -1, desc: -1, debit: -1, credit: -1 };
            
            row.forEach((cell, colIdx) => {
                if (!cell) return;
                const c = String(cell).toLowerCase();
                
                if (tempCols.date === -1 && /(date|txn date|value date)/.test(c)) { score++; tempCols.date = colIdx; }
                else if (tempCols.desc === -1 && /(description|narration|particulars|remarks|details)/.test(c)) { score++; tempCols.desc = colIdx; }
                else if (tempCols.debit === -1 && /(debit|withdrawal|dr|out|amount)/.test(c)) { score++; tempCols.debit = colIdx; }
                else if (tempCols.credit === -1 && /(credit|deposit|cr|in)/.test(c)) { score++; tempCols.credit = colIdx; }
            });

            if (score > maxScore) {
                maxScore = score;
                headerIdx = i;
                columns = tempCols;
            }
        }

        if (headerIdx === -1 || maxScore < 2) {
            this.csvSysMsg.textContent = "> ERROR: Cannot identify bank statement columns. Ensure Date, Description, and Debit/Credit exist.";
            return;
        }

        this.csvSysMsg.textContent = "> Analyzing financial footprint...";

        // 2. Parse exactly what we need
        let totalDebits = 0;
        let totalCredits = 0;
        let validTxns = 0;

        for (let i = headerIdx + 1; i < rows.length; i++) {
            const row = rows[i];
            // Basic validation
            if (!row[columns.date] && !row[columns.desc]) continue;

            const parseAmount = (val) => {
                if (!val) return 0;
                const clean = String(val).replace(/[^0-9.-]+/g, "");
                const num = parseFloat(clean);
                return isNaN(num) ? 0 : Math.abs(num);
            };

            let debit = columns.debit !== -1 ? parseAmount(row[columns.debit]) : 0;
            let credit = columns.credit !== -1 ? parseAmount(row[columns.credit]) : 0;
            
            // If amount column handles both (like 'Amount' + negative for debit)
            if (columns.debit !== -1 && columns.credit === -1) {
                const raw = String(row[columns.debit]).replace(/[^\d.-]/g, '');
                const num = parseFloat(raw);
                if (num < 0) { debit = Math.abs(num); credit = 0; }
                else if (num > 0) { credit = num; debit = 0; }
            }

            if (debit > 0 || credit > 0) validTxns++;
            totalDebits += debit;
            totalCredits += credit;
        }

        // 3. Update Result UI
        document.getElementById('csv-stat-txns').textContent = validTxns;
        document.getElementById('csv-stat-debits').textContent = totalDebits.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
        document.getElementById('csv-stat-credits').textContent = totalCredits.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

        setTimeout(() => {
            this.switchView('csvResult');
        }, 1200);
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
        
        const shareText = `I just found out what kind of spender I am.\n\nThink you can do better?\nTake the Financial Personality quiz:\n\n${challengeUrl}`;
        
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

app.settings = settingsManager;
app.finance = financeManager;
app.init();
