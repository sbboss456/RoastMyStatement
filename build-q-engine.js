const fs = require('fs');

const COUNTRIES = {
    // NA
    US: { name: 'United States', code: 'US', currency: '$', loc: 'en-US', reg: 'NA', ex: { f: 'DoorDash', w: 'Venmo', s: 'Amazon', t: 'Uber', h: 'Black Friday', c: 'Taco Bell', m: 'Target', b: 'credit card' } },
    CA: { name: 'Canada', code: 'CA', currency: 'C$', loc: 'en-CA', reg: 'NA', ex: { f: 'SkipTheDishes', w: 'e-Transfer', s: 'Amazon', t: 'Uber', h: 'Boxing Day', c: 'Tim Hortons', m: 'Walmart', b: 'credit card' } },
    // EU
    GB: { name: 'United Kingdom', code: 'GB', currency: '£', loc: 'en-GB', reg: 'EU', ex: { f: 'Deliveroo', w: 'Monzo', s: 'ASOS', t: 'Uber', h: 'Boxing Day', c: 'Greggs', m: 'Tesco', b: 'overdraft' } },
    DE: { name: 'Germany', code: 'DE', currency: '€', loc: 'de-DE', reg: 'EU', ex: { f: 'Lieferando', w: 'PayPal', s: 'Zalando', t: 'Bolt', h: 'Oktoberfest', c: 'Döner', m: 'Aldi', b: 'Girocard' } },
    FR: { name: 'France', code: 'FR', currency: '€', loc: 'fr-FR', reg: 'EU', ex: { f: 'UberEats', w: 'Lydia', s: 'Veepee', t: 'Uber', h: 'Soldes', c: 'Boulangerie', m: 'Carrefour', b: 'carte bancaire' } },
    IT: { name: 'Italy', code: 'IT', currency: '€', loc: 'it-IT', reg: 'EU', ex: { f: 'JustEat', w: 'Satispay', s: 'Amazon', t: 'Taxi', h: 'Saldi', c: 'Pizzeria', m: 'Esselunga', b: 'bancomat' } },
    ES: { name: 'Spain', code: 'ES', currency: '€', loc: 'es-ES', reg: 'EU', ex: { f: 'Glovo', w: 'Bizum', s: 'Zara', t: 'Cabify', h: 'Rebajas', c: 'Tapas', m: 'Mercadona', b: 'tarjeta' } },
    NL: { name: 'Netherlands', code: 'NL', currency: '€', loc: 'nl-NL', reg: 'EU', ex: { f: 'Thuisbezorgd', w: 'Tikkie', s: 'Bol.com', t: 'Uber', h: 'Sinterklaas', c: 'Snackmuur', m: 'Albert Heijn', b: 'pinpas' } },
    CH: { name: 'Switzerland', code: 'CH', currency: 'CHF', loc: 'de-CH', reg: 'EU', ex: { f: 'Eat.ch', w: 'Twint', s: 'Galaxus', t: 'SBB', h: 'Sales', c: 'Kebab', m: 'Migros/Coop', b: 'card' } },
    AT: { name: 'Austria', code: 'AT', currency: '€', loc: 'de-AT', reg: 'EU', ex: { f: 'Mjam', w: 'PayPal', s: 'Amazon', t: 'Taxi', h: 'Sales', c: 'Würstelstand', m: 'Billa', b: 'card' } },
    SE: { name: 'Sweden', code: 'SE', currency: 'kr', loc: 'sv-SE', reg: 'EU', ex: { f: 'Foodora', w: 'Swish', s: 'Zalando', t: 'Taxi', h: 'Mellandagsrea', c: 'Korv', m: 'ICA', b: 'card' } },
    NO: { name: 'Norway', code: 'NO', currency: 'kr', loc: 'nb-NO', reg: 'EU', ex: { f: 'Wolt', w: 'Vipps', s: 'Zalando', t: 'Taxi', h: 'Sales', c: 'Pølse', m: 'Kiwi', b: 'card' } },
    DK: { name: 'Denmark', code: 'DK', currency: 'kr', loc: 'da-DK', reg: 'EU', ex: { f: 'Wolt', w: 'MobilePay', s: 'Zalando', t: 'Taxi', h: 'Sales', c: 'Hotdog', m: 'Netto', b: 'card' } },
    FI: { name: 'Finland', code: 'FI', currency: '€', loc: 'fi-FI', reg: 'EU', ex: { f: 'Wolt', w: 'MobilePay', s: 'Verkkokauppa', t: 'Taxi', h: 'Sales', c: 'Grilli', m: 'K-Market', b: 'card' } },
    IE: { name: 'Ireland', code: 'IE', currency: '€', loc: 'en-IE', reg: 'EU', ex: { f: 'Deliveroo', w: 'Revolut', s: 'ASOS', t: 'FreeNow', h: 'St Patrick', c: 'Deli', m: 'Dunnes', b: 'card' } },
    PT: { name: 'Portugal', code: 'PT', currency: '€', loc: 'pt-PT', reg: 'EU', ex: { f: 'UberEats', w: 'MB Way', s: 'Zara', t: 'Bolt', h: 'Saldos', c: 'Pastelaria', m: 'Continente', b: 'card' } },
    PL: { name: 'Poland', code: 'PL', currency: 'zł', loc: 'pl-PL', reg: 'EU', ex: { f: 'Pyszne', w: 'BLIK', s: 'Allegro', t: 'Bolt', h: 'Promocje', c: 'Zapiekanka', m: 'Biedronka', b: 'card' } },
    CZ: { name: 'Czech Republic', code: 'CZ', currency: 'Kč', loc: 'cs-CZ', reg: 'EU', ex: { f: 'DameJidlo', w: 'Revolut', s: 'Alza', t: 'Bolt', h: 'Slevy', c: 'Smažák', m: 'Kaufland', b: 'card' } },
    RO: { name: 'Romania', code: 'RO', currency: 'lei', loc: 'ro-RO', reg: 'EU', ex: { f: 'Tazz', w: 'Revolut', s: 'eMAG', t: 'Bolt', h: 'Black Friday', c: 'Shaorma', m: 'Mega Image', b: 'card' } },
    HU: { name: 'Hungary', code: 'HU', currency: 'Ft', loc: 'hu-HU', reg: 'EU', ex: { f: 'Foodora', w: 'Revolut', s: 'eMAG', t: 'Bolt', h: 'Akciók', c: 'Lángos', m: 'Spar', b: 'card' } },
    // SA
    IN: { name: 'India', code: 'IN', currency: '₹', loc: 'en-IN', reg: 'SA', ex: { f: 'Zomato/Swiggy', w: 'UPI', s: 'Flipkart', t: 'Ola/Rapido', h: 'Diwali', c: 'Pani Puri', m: 'Bazaar', b: 'bank account' } },
    // SEA
    SG: { name: 'Singapore', code: 'SG', currency: 'S$', loc: 'en-SG', reg: 'SEA', ex: { f: 'GrabFood', w: 'PayLah', s: 'Shopee', t: 'Grab', h: 'GSS', c: 'Hawker centre', m: 'NTUC', b: 'wallet' } },
    MY: { name: 'Malaysia', code: 'MY', currency: 'RM', loc: 'ms-MY', reg: 'SEA', ex: { f: 'Foodpanda', w: 'Touch n Go', s: 'Shopee', t: 'Grab', h: 'Raya', c: 'Mamak', m: 'Pasar Malam', b: 'wallet' } },
    ID: { name: 'Indonesia', code: 'ID', currency: 'Rp', loc: 'id-ID', reg: 'SEA', ex: { f: 'GoFood', w: 'GoPay/OVO', s: 'Tokopedia', t: 'GoRide', h: 'Lebaran', c: 'Warung', m: 'Indomaret', b: 'wallet' } },
    TH: { name: 'Thailand', code: 'TH', currency: '฿', loc: 'th-TH', reg: 'SEA', ex: { f: 'GrabFood', w: 'PromptPay', s: 'Lazada', t: 'Grab/TukTuk', h: 'Songkran', c: 'Street food', m: '7-Eleven', b: 'wallet' } },
    PH: { name: 'Philippines', code: 'PH', currency: '₱', loc: 'en-PH', reg: 'SEA', ex: { f: 'Foodpanda', w: 'GCash', s: 'Shopee', t: 'Grab/Jeep', h: 'Christmas', c: 'Jollibee', m: 'Sari-sari', b: 'wallet' } },
    VN: { name: 'Vietnam', code: 'VN', currency: '₫', loc: 'vi-VN', reg: 'SEA', ex: { f: 'ShopeeFood', w: 'MoMo', s: 'Shopee', t: 'GrabBike', h: 'Tet', c: 'Banh Mi', m: 'Circle K', b: 'wallet' } },
    // EA
    JP: { name: 'Japan', code: 'JP', currency: '¥', loc: 'ja-JP', reg: 'EA', ex: { f: 'UberEats', w: 'PayPay', s: 'Rakuten', t: 'Train', h: 'Golden Week', c: 'Konbini', m: 'Donki', b: 'account' } },
    KR: { name: 'South Korea', code: 'KR', currency: '₩', loc: 'ko-KR', reg: 'EA', ex: { f: 'Baemin', w: 'KakaoPay', s: 'Coupang', t: 'Taxi', h: 'Chuseok', c: 'Pojangmacha', m: 'CU', b: 'account' } },
    // ME
    AE: { name: 'United Arab Emirates', code: 'AE', currency: 'د.إ', loc: 'ar-AE', reg: 'ME', ex: { f: 'Talabat', w: 'Apple Pay', s: 'Noon', t: 'Careem', h: 'Eid', c: 'Shawarma', m: 'Carrefour', b: 'card' } },
    SA: { name: 'Saudi Arabia', code: 'SA', currency: '﷼', loc: 'ar-SA', reg: 'ME', ex: { f: 'Jahez', w: 'STC Pay', s: 'Noon', t: 'Uber', h: 'Eid', c: 'Shawarma', m: 'Panda', b: 'card' } },
    TR: { name: 'Turkey', code: 'TR', currency: '₺', loc: 'tr-TR', reg: 'ME', ex: { f: 'Yemeksepeti', w: 'Papara', s: 'Trendyol', t: 'Taksi', h: 'Bayram', c: 'Simit', m: 'BIM', b: 'card' } },
    IL: { name: 'Israel', code: 'IL', currency: '₪', loc: 'he-IL', reg: 'ME', ex: { f: 'Wolt', w: 'Bit', s: 'Terminal X', t: 'Gett', h: 'Holidays', c: 'Falafel', m: 'Super-Pharm', b: 'card' } },
    // LATAM
    BR: { name: 'Brazil', code: 'BR', currency: 'R$', loc: 'pt-BR', reg: 'LATAM', ex: { f: 'iFood', w: 'Pix', s: 'Mercado Livre', t: 'Uber', h: 'Carnaval', c: 'Coxinha', m: 'Mercado', b: 'conta' } },
    MX: { name: 'Mexico', code: 'MX', currency: '$', loc: 'es-MX', reg: 'LATAM', ex: { f: 'Rappi', w: 'Transfer', s: 'Mercado Libre', t: 'DiDi', h: 'Buen Fin', c: 'Tacos', m: 'OXXO', b: 'tarjeta' } },
    AR: { name: 'Argentina', code: 'AR', currency: '$', loc: 'es-AR', reg: 'LATAM', ex: { f: 'PedidosYa', w: 'MercadoPago', s: 'Mercado Libre', t: 'Cabify', h: 'Hot Sale', c: 'Empanadas', m: 'Kiosco', b: 'tarjeta' } },
    CO: { name: 'Colombia', code: 'CO', currency: '$', loc: 'es-CO', reg: 'LATAM', ex: { f: 'Rappi', w: 'Nequi', s: 'Mercado Libre', t: 'InDrive', h: 'Día sin IVA', c: 'Arepas', m: 'Éxito', b: 'tarjeta' } },
    CL: { name: 'Chile', code: 'CL', currency: '$', loc: 'es-CL', reg: 'LATAM', ex: { f: 'PedidosYa', w: 'Mach', s: 'Falabella', t: 'Uber', h: 'CyberDay', c: 'Completo', m: 'Líder', b: 'tarjeta' } },
    // ANZ & AF
    AU: { name: 'Australia', code: 'AU', currency: 'A$', loc: 'en-AU', reg: 'ANZ', ex: { f: 'UberEats', w: 'PayID', s: 'Amazon', t: 'Uber', h: 'Boxing Day', c: 'Maccas', m: 'Woolies', b: 'card' } },
    NZ: { name: 'New Zealand', code: 'NZ', currency: 'NZ$', loc: 'en-NZ', reg: 'ANZ', ex: { f: 'UberEats', w: 'Transfer', s: 'TradeMe', t: 'Uber', h: 'Boxing Day', c: 'Pie', m: 'Countdown', b: 'card' } },
    ZA: { name: 'South Africa', code: 'ZA', currency: 'R', loc: 'en-ZA', reg: 'AF', ex: { f: 'Mr D Food', w: 'EFT', s: 'Takealot', t: 'Uber', h: 'Black Friday', c: 'Gatsby', m: 'Checkers', b: 'card' } }
};

function fmt(val, c) {
    const f = new Intl.NumberFormat(c.loc, { style: 'currency', currency: 'USD', maximumFractionDigits: 0}).format(val).replace(/\s/g, '');
    let sym = c.currency;
    return f.replace('$', sym).replace('US', '').replace('CA', '').replace('A', '').replace('NZ', '');
}

const Q_GENERATORS = [];
const opt = (text, impact) => ({ text, impact });

const timeContexts = [
    "It's 8:00 AM.", "It's late at night.", "You just got paid today.", "It's exactly 3 days before payday.",
    "You are extremely bored at work.", "You're waiting for a friend who is notoriously late.",
    "It's a lazy Sunday afternoon.", "You just received a mild bonus."
];

const BASE_ARCHETYPES = [
    { c: 'SHOPPING', t1: "You walk into", t2: "to buy ONE specific item.", a1: "I buy exactly that item and leave.", a2: "I leave with 5 items I didn't need.", a3: "I completely black out and spend", a4: "I compare prices on my phone before buying." },
    { c: 'SAVING', t1: "Your salary hits your", t2: "account.", a1: "Auto-transfer 20% to savings immediately.", a2: "Pay bills first, save whatever is left.", a3: "I feel rich for exactly 48 hours.", a4: "What salary? It instantly vanishes to debts." },
    { c: 'ENTERTAINMENT', t1: "You find an amazing concert/event, but tickets are", t2: ".", a1: "Skip it. Too expensive.", a2: "Buy it. Experiences > Money.", a3: "Wait to see if prices drop last minute.", a4: "Buy VIP tickets on credit." },
    { c: 'SUBSCRIPTION', t1: "You notice a recurring charge for a service you haven't used in 4 months.", t2: "", a1: "Cancel it immediately.", a2: "I'll do it later (I won't).", a3: "Keep it, just in case I need it tomorrow.", a4: "I didn't even notice the transaction." },
    { c: 'TRANSPORT', t1: "You need to get home. It's raining. A", t2: "surge pricing is 3x normal.", a1: "Wait it out. I'm not paying surge pricing.", a2: "Take public transport instead.", a3: "Book it. I value my comfort.", a4: "Book the premium tier so it arrives faster." },
    { c: 'HEALTH', t1: "Your gym membership costs", t2: "a month.", a1: "I go 5 times a week. Worth it.", a2: "I go once a month. Terribly inefficient.", a3: "I cancel it and workout at home.", a4: "I pay it just to feel like I'm healthy." },
    { c: 'TECH', t1: "Your phone battery degrades. A new phone is", t2: ".", a1: "Replace the battery for cheap.", a2: "Use it until it completely dies.", a3: "Trade it in for the newest model.", a4: "Buy the Pro Max version on a 24-month contract." },
    { c: 'IMPULSE', t1: "You discover a random", t2: "gift card from last year.", a1: "Save it for when I actually need something.", a2: "Use it instantly on something unnecessary.", a3: "Sell it to a friend for cash.", a4: "Forget about it again." },
    { c: 'SOCIAL', t1: "Your friends invite you to a dinner that will cost at least", t2: ".", a1: "Politely decline to save money.", a2: "Go, but order the cheapest side dish.", a3: "Go all out and split the bill evenly.", a4: "Offer to pay for the whole table via card." },
    { c: 'FOOD', t1: "It's 8 PM. You're exhausted. You could cook, or spend", t2: "on delivery.", a1: "I cook. Ingredients exist for a reason.", a2: "I cook something instant and cheap.", a3: "I order delivery. Time is money.", a4: "I order delivery and add dessert to hit free shipping." },
    { c: 'RISK', t1: "A friend tells you about a 'guaranteed' crypto coin investment. Minimum buy-in is", t2: ".", a1: "Absolutely not. I like my money.", a2: "Read the whitepaper, then decide.", a3: "Throw the money in. YOLO.", a4: "Borrow money to invest." },
    { c: 'EMERGENCY', t1: "Your car/bike needs a sudden repair costing", t2: ".", a1: "Pay from my emergency fund.", a2: "Cut back on expenses this month to cover it.", a3: "Put it on a credit card and worry later.", a4: "Ignore the repair and hope it doesn't explode." },
    { c: 'CONVENIENCE', t1: "You are at the airport. A bottle of water is", t2: ".", a1: "Refuse to buy it. I have principles.", a2: "Find a water fountain.", a3: "Grumble, but buy it.", a4: "Buy the water, a magazine, and a neck pillow." },
    { c: 'FOMO', t1: "Everyone is buying the new viral gadget. It costs", t2: ".", a1: "I don't care about trends.", a2: "I wait a month until the hype dies.", a3: "I buy it on release day.", a4: "I pre-order the collector's edition." }
];

let baseTargetAmt = 15;
for (let i = 0; i < 8; i++) {
    BASE_ARCHETYPES.forEach((arch, idx) => {
        // Enforce absolute uniqueness mathematically.
        let baseVal = baseTargetAmt * ((i + 1) * 3) + (idx * 5) + (i*17); 
        let noiseContext = timeContexts[i];
        
        Q_GENERATORS.push((c) => {
            let moneyStr = fmt(baseVal, c);
            if (arch.c === 'SHOPPING') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${c.ex.m} ${arch.t2}`, a: [ opt(arch.a1, { discipline: 20 }), opt(arch.a2, { impulse: 15, chaos: 10 }), opt(`${arch.a3} ${fmt(baseVal * 3, c)}.`, { chaos: 25, impulse: 25 }), opt(arch.a4, { saving: 15 }) ] };
            if (arch.c === 'SAVING') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${c.ex.b} ${arch.t2}`, a: [ opt(arch.a1, { saving: 25 }), opt(arch.a2, { discipline: 15 }), opt(arch.a3, { lifestyle: 20, chaos: 15 }), opt(arch.a4, { debt: 25, chaos: 20 }) ] };
            if (arch.c === 'ENTERTAINMENT') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { saving: 20 }), opt(arch.a2, { lifestyle: 20 }), opt(arch.a3, { discipline: 10 }), opt(arch.a4, { chaos: 20, risk: 20 }) ] };
            if (arch.c === 'SUBSCRIPTION') return { c: arch.c, t: `${noiseContext} You notice a ${moneyStr} recurring charge for a service you haven't used in 4 months.`, a: [ opt(arch.a1, { discipline: 20 }), opt(arch.a2, { laziness: 20, chaos: 10 }), opt(arch.a3, { chaos: 15 }), opt(arch.a4, { chaos: 30 }) ] };
            if (arch.c === 'TRANSPORT') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${c.ex.t} ${arch.t2}`, a: [ opt(arch.a1, { saving: 20 }), opt(arch.a2, { discipline: 15 }), opt(arch.a3, { lifestyle: 20 }), opt(arch.a4, { chaos: 20, impulse: 15 }) ] };
            if (arch.c === 'HEALTH') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr} ${arch.t2}`, a: [ opt(arch.a1, { discipline: 20 }), opt(arch.a2, { chaos: 15 }), opt(arch.a3, { saving: 20 }), opt(arch.a4, { lifestyle: 10 }) ] };
            if (arch.c === 'TECH') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { saving: 25, discipline: 20 }), opt(arch.a2, { saving: 15 }), opt(arch.a3, { lifestyle: 20, impulse: 15 }), opt(arch.a4, { chaos: 25, risk: 20 }) ] };
            if (arch.c === 'IMPULSE') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr} ${arch.t2}`, a: [ opt(arch.a1, { saving: 20 }), opt(arch.a2, { impulse: 25 }), opt(arch.a3, { discipline: 15 }), opt(arch.a4, { chaos: 15 }) ] };
            if (arch.c === 'SOCIAL') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { discipline: 20 }), opt(arch.a2, { saving: 15 }), opt(arch.a3, { social: 25 }), opt(`Offer to cover the whole table via ${c.ex.w}.`, { risk: 25, chaos: 20 }) ] };
            if (arch.c === 'FOOD') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr} on ${c.ex.f}.`, a: [ opt(arch.a1, { saving: 20 }), opt(arch.a2, { discipline: 15 }), opt(arch.a3, { lifestyle: 20 }), opt(arch.a4, { chaos: 20, impulse: 25 }) ] };
            if (arch.c === 'RISK') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { discipline: 20 }), opt(arch.a2, { future: 15 }), opt(arch.a3, { risk: 30, chaos: 10 }), opt(arch.a4, { debt: 30, chaos: 25 }) ] };
            if (arch.c === 'EMERGENCY') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { saving: 20, future: 15 }), opt(arch.a2, { discipline: 25 }), opt(arch.a3, { debt: 20, risk: 15 }), opt(arch.a4, { chaos: 30 }) ] };
            if (arch.c === 'CONVENIENCE') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { discipline: 25 }), opt(arch.a2, { saving: 15 }), opt(arch.a3, { impulse: 10 }), opt(arch.a4, { chaos: 20, impulse: 20 }) ] };
            if (arch.c === 'FOMO') return { c: arch.c, t: `${noiseContext} ${arch.t1} ${moneyStr}${arch.t2}`, a: [ opt(arch.a1, { discipline: 25 }), opt(arch.a2, { saving: 15 }), opt(`I buy it immediately on ${c.ex.s}.`, { impulse: 25, social: 15 }), opt(arch.a4, { chaos: 25 }) ] };
            return { c: 'MISC', t: 'Fallback', a: [] };
        });
    });
}

let FINAL_DB = [];

for (const [code, cData] of Object.entries(COUNTRIES)) {
    let qIdCounter = 1;
    Q_GENERATORS.forEach(gen => {
        let qObj = gen(cData);
        if (qObj && qObj.a && qObj.a.length > 0) {
            FINAL_DB.push({
                id: `${code}_Q${qIdCounter++}`,
                country: code,
                category: qObj.c,
                text: qObj.t,
                options: qObj.a,
                countries: [code]
            });
        }
    });
}

const jsData = `/**
 * ROAST MY STATEMENT - DATA ENGINE 3.0 (SUPER-LOCAL EXPANSION)
 * Minimum 100+ unique localized questions per 41 supported countries.
 * Over 4,500 highly specific questions total generated offline.
 */
const COUNTRIES = ${JSON.stringify(COUNTRIES)};
const QUESTIONS_DB = ${JSON.stringify(FINAL_DB)};

window.APP_DATA = {
    COUNTRIES: COUNTRIES,
    QUESTIONS: QUESTIONS_DB,
    getQuestionsForCountry(countryCode, count = 15, excludeIds = []) {
        let pool = this.QUESTIONS.filter(q => q.countries.includes(countryCode));
        if (pool.length === 0) pool = this.QUESTIONS.filter(q => q.countries.includes('US'));
        let validPool = pool.filter(q => !excludeIds.includes(q.id));
        if (validPool.length < count) validPool = pool;
        validPool.sort(() => 0.5 - Math.random());
        return validPool.slice(0, count);
    }
};

const ROAST_ENGINE = {
    generateMultiRoast(countryCode, pId, wTrait, sTrait, intensity) {
        let multiplier = intensity === 'MILD' ? 0 : intensity === 'BRUTAL' ? 2 : 1;
        const roastsOut = [];

        const pBase = [
            "Your relationship with money is toxic, but at least it's consistent.",
            "You manage money like a toddler managing a casino.",
            "You treat your bank account like it's a social experiment.",
            "If your bank account was a person, it would file a restraining order."
        ];
        
        roastsOut.push(pBase[Math.floor(Math.random() * pBase.length)]);

        // Localization Dictionary
        const loc = {
            IN: ["Zomato is probably classifying you as an angel investor.", "You buy things on EMI with the confidence of someone immortal.", "Your UPI pin is literally typing itself at this point."],
            US: ["Your subscriptions have formed their own independent economy.", "You are one missed paycheck away from becoming a cautionary tale.", "Your Amazon delivery driver probably hates you."],
            GB: ["Your bank statements consist purely of Monzo transfers, Deliveroo, and sadness.", "You treat Greggs like a Michelin star dining experience."],
            ID: ["Your GoPay is bleeding faster than you can top it up.", "You treat Shopee promos like a full-time career."],
            MY: ["You claim you're broke but your GrabFood history says you eat like royalty.", "Your Touch 'n Go balance gives me anxiety."],
            JP: ["You live in a tiny apartment but fund an empire inside the nearest Konbini.", "Your PayPay history is just impulsive anime merch and snacks."],
            AE: ["You live like an oil baron on an intern's salary.", "Talabat must love you."],
            BR: ["You Pix money out of your account the exact millisecond it arrives.", "You use credit card installments (cuotas) like they are a human right."],
            AU: ["You complain about housing prices but spend $40 a day on UberEats and coffee.", "Your Afterpay history is a digital tragedy."]
        };
        
        let cPool = loc[countryCode] || ["Your transaction history is just a series of regretful impulse decisions.", "You look at your balance and just accept that math is an illusion."];
        roastsOut.push(cPool[Math.floor(Math.random() * cPool.length)]);

        // Weakness
        const wRoasts = {
            chaos: "You manage money purely on vibes and aggressive delusion.",
            impulse: "Your impulse control is so weak a slight breeze could convince you to buy a boat.",
            saving: "Your savings account is literally just a myth.",
            food: "Your food delivery stats are starting to look like a restaurant's annual revenue.",
            digital: "You buy digital assets while your real-life assets rapidly depreciate.",
            lifestyle: "You are financing a luxury lifestyle on a survival budget.",
            default: "Your financial strategy appears to be closing your eyes and hoping for the best."
        };
        roastsOut.push(wRoasts[wTrait] || wRoasts.default);

        return roastsOut;
    }
};
window.APP_DATA.ROAST_ENGINE = ROAST_ENGINE;
`;

fs.writeFileSync('js/data-engine.js', jsData);
console.log('Successfully wrote 4,592 unique parameterized questions into data-engine.js.');
