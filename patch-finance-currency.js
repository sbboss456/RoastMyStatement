const fs = require('fs');
let js = fs.readFileSync('js/app.js', 'utf8');

const t = `    formatCurrency(num) {
        return num.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
    },`;

const n = `    formatCurrency(num) {
        let loc = 'en-US';
        let cur = 'USD';
        try {
            const cc = appState.country || localStorage.getItem('roast_country') || 'GL';
            if(window.APP_DATA && window.APP_DATA.COUNTRIES[cc]) {
                const map = { '$':'USD', 'C$':'CAD', '£':'GBP', '€':'EUR', 'kr':'SEK', 'zł':'PLN', 'Kč':'CZK', 'lei':'RON', 'Ft':'HUF', '₹':'INR', 'S$':'SGD', 'RM':'MYR', 'Rp':'IDR', '฿':'THB', '₱':'PHP', '₫':'VND', '¥':'JPY', '₩':'KRW', 'د.إ':'AED', '﷼':'SAR', '₺':'TRY', '₪':'ILS', 'R$':'BRL', 'A$':'AUD', 'NZ$':'NZD', 'R':'ZAR' };
                loc = window.APP_DATA.COUNTRIES[cc].loc || 'en-US';
                cur = map[window.APP_DATA.COUNTRIES[cc].currency] || 'USD';
                
                // Fallback direct override if currency code specifically needs native mapping
                if(window.APP_DATA.COUNTRIES[cc].code === 'SE') cur = 'SEK';
                if(window.APP_DATA.COUNTRIES[cc].code === 'NO') cur = 'NOK';
                if(window.APP_DATA.COUNTRIES[cc].code === 'DK') cur = 'DKK';
            }
        } catch(e) {}
        
        return num.toLocaleString(loc, { style: 'currency', currency: cur, maximumFractionDigits: 0 });
    },`;

js = js.replace(t, n);
fs.writeFileSync('js/app.js', js);
console.log('Fixed finance currency formatter');
