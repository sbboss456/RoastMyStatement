// Add to the top of data-engine.js or replace the export at the bottom

const ROAST_ENGINE = {
    generateMultiRoast(countryCode, pId, sTrait, wTrait, intensity) {
        
        let multiplier = 1;
        if(intensity === 'MILD') multiplier = 0;
        if(intensity === 'SAVAGE') multiplier = 1;
        if(intensity === 'BRUTAL') multiplier = 2;

        const roastsOut = [];

        // 1. Theme 1: Personality Based
        const globalP = [
            "Your relationship with money is toxic, but at least it's consistent.",
            "You manage money like a toddler managing a casino.",
            "Your bank account is just a rest stop before the money leaves forever.",
            "You have the financial equivalent of a sugar crash.",
            "I'd ask you to invest in a 401k but you probably think it's a marathon."
        ];
        
        const intenseP = [
            "Your financial statements should come with a trigger warning.",
            "If your bank account was a person, it would file a restraining order.",
            "Your spending history looks like an unmedicated manic episode.",
            "You are a weapon of mass financial destruction."
        ];

        // 2. Theme 2: Country/Context Based
        const cRoasts = {
            IN: [
                "Bhai, savings account mein ₹200 pade hain aur confidence ₹20 lakh ka hai.",
                "Your UPI pin is literally typing itself at this point.",
                "Zomato is probably classifying you as an angel investor.",
                "You buy things on EMI with the confidence of someone immortal.",
                "Sale season arrives and your bank balance immediately flatlines.",
                Math.random() > 0.5 ? "Your money evaporates faster than petrol in summer traffic." : "You treat Zepto like your own personal pantry. It concerns us."
            ],
            US: [
                "Your subscriptions have formed their own independent economy.",
                "You are one missed paycheck away from becoming a cautionary tale.",
                "Your UberEats driver knows your dogs by name.",
                "You treat Venmo requests like infinite debt glitches.",
                "Your Amazon delivery driver probably hates you."
            ],
            GB: [
                "Your bank statements consist purely of Monzo transfers, Deliveroo, and sadness.",
                "You treat Greggs like a Michelin star dining experience.",
                "Your financial situation is bleaker than the London weather."
            ],
            GLOBAL: [
                "Your transaction history is just a series of regretful impulse decisions.",
                "Your money enters your account and instantly requests a transfer out.",
                "You look at your balance and just accept that math is an illusion.",
                "You buy things you don't need purely to feel something.",
                "When you look at your budget, you just close your eyes and click 'Order'."
            ]
        };

        // 3. Theme 3: Weakness Based
        const wRoasts = {
            chaos: "You manage money purely on vibes and aggressive delusion.",
            impulse: "Your impulse control is so weak a slight breeze could convince you to buy a boat.",
            food: "Your food delivery stats are starting to look like a restaurant's annual revenue.",
            digital: "You buy digital assets while your real-life assets rapidly depreciate.",
            lifestyle: "You are financing a luxury lifestyle on a survival budget.",
            social: "You are singlehandedly funding the social lives of your entire friend group.",
            risk: "You treat financial risk like it's a minor inconvenience rather than impending doom.",
            default: "Your financial strategy appears to be closing your eyes and hoping for the best."
        };

        // Select Personality base
        let pPool = (multiplier > 1) ? [...globalP, ...intenseP] : globalP;
        roastsOut.push(pPool[Math.floor(Math.random() * pPool.length)]);

        // Select Country Base
        let cPool = cRoasts[countryCode];
        if(!cPool || cPool.length === 0) cPool = cRoasts.GLOBAL;
        roastsOut.push(cPool[Math.floor(Math.random() * cPool.length)]);

        // Select Weakness Base
        const wTxt = wRoasts[wTrait] || wRoasts.default;
        
        if (multiplier > 0) {
            roastsOut.push(wTxt);
        } else {
            // MILD modifier: soften the weakness roast slightly
            roastsOut.push(wTxt.replace("aggressive delusion", "confusion").replace("so weak a slight breeze", "a bit low so a breeze").replace("like a restaurant's annual revenue", "a bit high"));
        }

        // Shuffle slightly so the format isn't totally rigid format-wise
        roastsOut.sort(() => 0.5 - Math.random());

        return roastsOut;
    }
}
