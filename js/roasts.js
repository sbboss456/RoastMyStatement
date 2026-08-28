/**
 * ROAST MY STATEMENT - ROAST ENGINE LIBRARY 2.0
 * Massive procedural multi-dimensional roast generator.
 */

window.ROAST_LIBRARY = {
    // PRIMARY PERSONALITY ROASTS (Roast #1)
    personalities: {
        boss: [
            "You negotiate with vegetable vendors just to feel something.",
            "You treat a 50 rupee expense like it requires board approval.",
            "Your idea of a wild Friday night is rebalancing your mutual funds.",
            "You probably track your friends' debts down to the last decimal.",
            "You have the financial discipline of a monk and the personality of a tax return.",
            "I'm guessing your favorite movie is 'The Big Short'.",
            "You check your bank balance for fun the way normal people watch Netflix."
        ],
        foodie: [
            "The delivery driver knows you better than your parents do.",
            "Your financial portfolio is just a collection of Zomato and Swiggy receipts.",
            "You spend more on food you could have made at home for 20 rupees.",
            "If you stopped ordering paneer tikka at 2 AM, you'd own a house by now.",
            "You consider 'cooking' to be successfully entering your UPI PIN.",
            "Your grocery budget is 0, but your takeout budget is a small country's GDP."
        ],
        goblin: [
            "You are subscribed to 6 streaming platforms just to watch the same 3 shows.",
            "Your Steam backlog is a graveyard of abandoned 60-dollar investments.",
            "You owe Apple/Google your soul at this point in recurring fees.",
            "You buy 'productivity apps' but spend 6 hours a day on TikTok/Reels.",
            "You own more digital property than you do physical underwear."
        ],
        impulse: [
            "Your packages arrive faster than your paycheck.",
            "You treat 'Add to Cart' like a stress relief button. Grow up.",
            "Marketers love you because you fall for a '10% off' on a thing you don't need.",
            "You convinced yourself a 5000-rupee jacket was an 'investment piece.'",
            "You check out faster than your common sense can boot up."
        ],
        menace: [
            "Your wallet doesn't have a spending problem. It has a survival problem.",
            "Your bank statement reads like a loud cry for professional help.",
            "You are exactly one minor inconvenience away from total financial collapse.",
            "You manage money like a raccoon manages a dumpster.",
            "You swipe your card and hold your breath, praying to gods you don't believe in."
        ],
        default: [
            "Your financial life is painfully average and profoundly boring.",
            "You try to save but somehow end up exactly at zero by month end anyway.",
            "You exist in a constant state of 'I shouldn't buy this' and then buying it.",
            "You are the NPC of personal finance.",
            "You aren't broke enough to panic, but not rich enough to relax."
        ]
    },

    // STRENGTHS (Roast #2)
    strengths: {
        saving: [
            "You hoard cash like a dragon hoards gold, except you live in a 1BHK.",
            "Your savings account is beautiful, unlike your social life.",
            "Surgically precise saving habits mean you'll be the richest guy in the graveyard."
        ],
        discipline: [
            "Your impulse control is so robotic it's actually frightening.",
            "You stick to a budget so strictly I assume you hate having fun.",
            "Weaponized financial discipline."
        ],
        future: [
            "You are so obsessed with retirement you forgot to live in your 20s.",
            "Your 5-year plan is flawless. Sadly, your weekend plans don't exist.",
            "You already calculated inflation for 2050. Go outside and touch grass."
        ],
        confidence: [
            "You are financially confident, which just means you justify your purchases faster.",
            "High money confidence. Too bad it borders on unchecked hubris.",
            "You don't panic check your bank account because you simply assume it's fine."
        ],
        default: [
            "Your greatest financial strength is purely surviving until Friday.",
            "You are distinctly average at preserving capital.",
            "You don't have a unique strength, you just haven't exploded yet."
        ]
    },

    // WEAKNESSES (Roast #3)
    weaknesses: {
        chaos: [
            "Pure Financial Chaos. You navigate your life entirely on vibes and overdraft fees.",
            "Total structural collapse. Your ledger is an insult to mathematics.",
            "Utter Money Anarchy. Even your bank app is tired of opening."
        ],
        impulse: [
            "Unrestricted Impulse Buying. A 20% discount literally mind-controls you.",
            "Zero Temptation Immunity. You buy things you don't need with money you don't have.",
            "Fatal levels of FOMO shopping. Marketers study you in labs."
        ],
        lifestyle: [
            "Severe Lifestyle Inflation. You have champagne taste on a tap-water budget.",
            "Status-seeking pathology. You buy expensive things so strangers think you're rich.",
            "Luxury addiction. You upgrade things that function perfectly fine."
        ],
        risk: [
            "Dangerous Risk Tolerance. You treat life savings like casino chips.",
            "Reckless Speculation. 'Buy high, sell low' is practically your motto.",
            "Complete disregard for financial safety nets. You love playing on hard mode."
        ],
        default: [
            "Consistent Poor Execution. You know better, but you refuse to do better.",
            "Chronic Financial Laziness. You just let the subscriptions auto-renew.",
            "Your biggest weakness is actively refusing to look at your bank balance."
        ]
    }
};

window.ROAST_LIBRARY.generateMultiRoast = function(personalityId, strengthKey, weaknessKey) {
    // Primary
    const pArray = this.personalities[personalityId] || this.personalities.default;
    const r1 = pArray[Math.floor(Math.random() * pArray.length)];
    
    // Strength
    const sArray = this.strengths[strengthKey] || this.strengths.default;
    const r2 = sArray[Math.floor(Math.random() * sArray.length)];

    // Weakness
    const wArray = this.weaknesses[weaknessKey] || this.weaknesses.default;
    const r3 = wArray[Math.floor(Math.random() * wArray.length)];

    return [r1, r2, r3];
};