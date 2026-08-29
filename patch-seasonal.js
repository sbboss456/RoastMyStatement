// Append to data-engine.js 

const SEASONAL = {
    isSaleSeason: () => { const m = new Date().getMonth(); return (m === 10 || m === 11); }, // Nov, Dec
    isWeddingSeason: () => { const m = new Date().getMonth(); return (m >= 10 || m <= 2); }, // IN mostly
    
    getPack(countryCode) {
        let packs = [];
        if (countryCode === 'IN' && this.isWeddingSeason()) {
            packs.push("You are spending ₹10,000 on a sherwani/lehenga for a colleague's wedding you didn't even want to go to.");
        }
        if (countryCode === 'US' && this.isSaleSeason()) {
            packs.push("Black Friday is precisely why you will never own a home.");
        }
        if ((countryCode === 'GB' || countryCode === 'AU') && this.isSaleSeason()) {
            packs.push("Boxing day sales are an IQ test, and you just failed.");
        }
        return packs;
    }
};

// Inject into ROAST_ENGINE in data-engine.js via node
const fs = require('fs');
let js = fs.readFileSync('js/data-engine.js', 'utf8');

const sIdx = js.indexOf('roastsOut.push(wTxt);');
if (sIdx > -1) {
    js = js.replace('roastsOut.push(wTxt);', `roastsOut.push(wTxt);\n        \n        const seasonals = SEASONAL.getPack(countryCode);\n        if (seasonals.length > 0 && Math.random() > 0.5) roastsOut.push(seasonals[Math.floor(Math.random() * seasonals.length)]);\n        `);
    js = js + '\n' + `const SEASONAL = {
    isSaleSeason: () => { const m = new Date().getMonth(); return (m === 10 || m === 11); },
    isWeddingSeason: () => { const m = new Date().getMonth(); return (m >= 10 || m <= 2); },
    getPack(countryCode) {
        let packs = [];
        if (countryCode === 'IN' && this.isWeddingSeason()) {
            packs.push("You are spending ₹10,000 on a sherwani/lehenga for a colleague's wedding you didn't even want to go to.");
        }
        if (countryCode === 'US' && this.isSaleSeason()) {
            packs.push("Black Friday is precisely why you will never own a home.");
        }
        if ((countryCode === 'GB' || countryCode === 'AU') && this.isSaleSeason()) {
            packs.push("Boxing day sales are an IQ test, and you just failed.");
        }
        return packs;
    }
};`;
    fs.writeFileSync('js/data-engine.js', js);
    console.log('Seasonal packs injected');
} else {
    console.log('Could not find injection point');
}
