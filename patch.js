const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const countrySection = `
        <!-- ==========================================
             VIEW: COUNTRY SELECT
             ========================================== -->
        <section id="view-country-select" class="view hidden">
            <div class="result-header fade-in">
                <span class="tech-label highlight-acid">STEP 1 // INITIALIZATION</span>
                <h2>WHERE ARE YOU FROM?</h2>
                <p class="text-muted mt-2">We adapt the scenarios, currency, and roasting to your local economy.</p>
            </div>
            
            <div class="country-list-wrapper mt-4 fade-in-delayed" style="max-width: 400px; margin: 0 auto; text-align: left;">
                <input type="text" class="app-input mb-4" id="country-search" placeholder="Search Country..." onkeyup="app.filterCountries()">
                
                <div class="country-list custom-scrollbar" id="country-list-container" style="max-height: 50vh; overflow-y: auto; display: flex; flex-direction: column; gap: 0.5rem; padding-right: 0.5rem;">
                    <!-- Populated via JS -->
                </div>
                
                <button class="action-button primary-cta pulse-glow w-full mt-4" id="btn-confirm-country" onclick="app.confirmCountry()" disabled style="opacity:0.5; pointer-events:none;">
                    <span>CONFIRM & START</span>
                </button>
            </div>
        </section>
`;

const insertPos = html.indexOf('<!-- ==========================================\n             VIEW: QUIZ');
if (insertPos > -1) {
    html = html.substring(0, insertPos) + countrySection + '\n' + html.substring(insertPos);
    fs.writeFileSync('index.html', html);
    console.log('Country UI Injected');
} else {
    console.log('Quiz view not found');
}
