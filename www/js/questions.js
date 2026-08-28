window.QUESTION_BANK = [
    // IMPULSE
    { id: "IMP_01", cat: "impulse", text: "You see a massive '80% OFF - 2 HOURS LEFT' sign on a jacket.", options: [
        { text: "Buy immediately. That's a steal.", impact: { impulse: 15, chaos: 10, saving: -5 } },
        { text: "Add to cart, leave it to think.", impact: { impulse: 5, discipline: 5 } },
        { text: "Ignore. Sales are psychological traps.", impact: { saving: 5, discipline: 15, impulse: -15 } },
        { text: "Buy it, then regret it tomorrow.", impact: { impulse: 15, chaos: 15, confidence: -10 } }
    ]},
    { id: "IMP_02", cat: "impulse", text: "It's 2 AM and you can't sleep. You open an online store.", options: [
        { text: "I already bought three things.", impact: { impulse: 20, chaos: 15, lifestyle: 10 } },
        { text: "Just window shopping. Usually.", impact: { impulse: 5, discipline: -5 } },
        { text: "I only read the 1-star reviews for fun.", impact: { discipline: 10, confidence: 5 } },
        { text: "I fall asleep before buying anything.", impact: { impulse: -5, saving: 5 } }
    ]},
    { id: "IMP_03", cat: "impulse", text: "You walk into a store just to 'look around'.", options: [
        { text: "I leave with 4 bags.", impact: { impulse: 20, chaos: 10, saving: -10 } },
        { text: "I buy one small thing I actually needed.", impact: { discipline: 5, impulse: 5 } },
        { text: "I judge the prices and leave.", impact: { discipline: 15, confidence: 10 } },
        { text: "I buy something just so the cashier doesn't judge me.", impact: { impulse: 10, confidence: -15 } }
    ]},
    { id: "IMP_04", cat: "impulse", text: "A new flagship phone drops. Yours works perfectly fine.", options: [
        { text: "Pre-order immediately. I need the new camera.", impact: { impulse: 20, lifestyle: 15, saving: -15 } },
        { text: "Wait 6 months for a price drop.", impact: { discipline: 10, future: 5 } },
        { text: "Mine works. Who cares?", impact: { saving: 15, discipline: 15, lifestyle: -10 } },
        { text: "Buy it using a 24-month EMI.", impact: { impulse: 15, chaos: 20, future: -15 } }
    ]},
    
    // SAVING
    { id: "SAV_01", cat: "saving", text: "You suddenly receive an unexpected ₹20,000 bonus.", options: [
        { text: "Straight into the hidden savings account.", impact: { saving: 20, discipline: 10, future: 15, impulse: -10 } },
        { text: "Time to buy that expensive thing I wanted.", impact: { impulse: 15, lifestyle: 15, saving: -20 } },
        { text: "Half save, half spend.", impact: { saving: 10, discipline: 10, lifestyle: 5 } },
        { text: "Wait, where did the money just go?", impact: { chaos: 20, impulse: 15, saving: -20 } }
    ]},
    { id: "SAV_02", cat: "saving", text: "What does your emergency fund look like?", options: [
        { text: "6+ months of living expenses safely locked.", impact: { saving: 20, future: 20, confidence: 15, chaos: -20 } },
        { text: "Maybe about 1 month, if I eat noodles.", impact: { saving: 5, chaos: 5 } },
        { text: "My what? My credit card is my emergency fund.", impact: { chaos: 20, risk: 15, saving: -20 } },
        { text: "I literally have ₹45 in a drawer.", impact: { chaos: 15, future: -10 } }
    ]},
    { id: "SAV_03", cat: "saving", text: "It's the 1st of the month, salary day.", options: [
        { text: "Instantly automate 20% into investments.", impact: { saving: 20, discipline: 20, future: 20 } },
        { text: "Pay off my credit card so I can use it again.", impact: { chaos: 10, discipline: -5, saving: -10 } },
        { text: "Buy all the things sitting in my cart.", impact: { impulse: 15, lifestyle: 10, saving: -10 } },
        { text: "Ignore it. It will disappear anyway.", impact: { chaos: 15, confidence: -15 } }
    ]},

    // BUDGETING
    { id: "BUD_01", cat: "budgeting", text: "How do you track your monthly expenses?", options: [
        { text: "A terrifyingly organized nested spreadsheet.", impact: { discipline: 20, saving: 10, chaos: -20 } },
        { text: "A finance app that yells at me.", impact: { discipline: 10, chaos: -5 } },
        { text: "I just check my bank balance and pray.", impact: { chaos: 15, risk: 5 } },
        { text: "Tracking expenses implies I care to know.", impact: { chaos: 20, discipline: -20, confidence: -10 } }
    ]},
    { id: "BUD_02", cat: "budgeting", text: "It's the 25th. You have 5 days until payday and ₹1000 left.", options: [
        { text: "Easy. Cook at home, no problem.", impact: { discipline: 15, saving: 10 } },
        { text: "Panic slightly and eat instant noodles.", impact: { chaos: 5, confidence: -10 } },
        { text: "Borrow money from a friend. Again.", impact: { chaos: 15, risk: 10, discipline: -15 } },
        { text: "Put dinner on the credit card. Problem solved.", impact: { chaos: 10, impulse: 5, future: -10 } }
    ]},

    // FOOD & DELIVERY
    { id: "FOD_01", cat: "food", text: "You have fresh chicken and veggies in the fridge.", options: [
        { text: "Cook a healthy meal.", impact: { discipline: 15, saving: 10, chaos: -10 } },
        { text: "Order pizza. I lacked 'energy'.", impact: { impulse: 15, lifestyle: 10, saving: -10 } },
        { text: "They will rot while I eat takeout for 3 days.", impact: { chaos: 20, impulse: 15, discipline: -20 } },
        { text: "Cook the chicken, but order dessert anyway.", impact: { impulse: 10, lifestyle: 5 } }
    ]},
    { id: "FOD_02", cat: "food", text: "Delivery apps start charging a high 'rain surge' fee.", options: [
        { text: "Delete the app and make an egg sandwich.", impact: { discipline: 15, saving: 15 } },
        { text: "Wait 20 minutes and check if it dropped.", impact: { discipline: 5, saving: 5 } },
        { text: "Pay it blindly. I'm craving a burger.", impact: { impulse: 20, lifestyle: 10, discipline: -15 } },
        { text: "Order more food to justify the high fee.", impact: { chaos: 15, impulse: 15, lifestyle: 10 } }
    ]},

    // ENTERTAINMENT & SUBSCRIPTIONS
    { id: "ENT_01", cat: "subscriptions", text: "A service you forgot about charges you ₹999 for an annual renewal.", options: [
        { text: "Cancel immediately, demand a refund via support.", impact: { discipline: 15, saving: 10 } },
        { text: "Say 'I'll cancel it later' and forget again.", impact: { chaos: 15, discipline: -15, future: -10 } },
        { text: "Guess I'll start using it again... tomorrow.", impact: { chaos: 10, confidence: -5 } },
        { text: "Doesn't matter. I share the password with 6 people.", impact: { saving: 5, risk: 10 } }
    ]},
    { id: "ENT_02", cat: "entertainment", text: "Your friends invite you to an overpriced music festival.", options: [
        { text: "Say no. I have financial goals.", impact: { saving: 15, future: 15, lifestyle: -10 } },
        { text: "Go, but sneak in my own drinks to save money.", impact: { saving: 5, risk: 15 } },
        { text: "Buy VIP tickets. YOLO.", impact: { impulse: 20, lifestyle: 20, risk: 10, future: -15 } },
        { text: "Agree to go, then cancel last minute because broke.", impact: { chaos: 15, confidence: -15 } }
    ]},

    // SOCIAL SPENDING
    { id: "SOC_01", cat: "social", text: "Splitting the group dinner bill at a fancy place. You only ordered a salad.", options: [
        { text: "Split evenly. I don't want to be 'that' guy.", impact: { confidence: -10, saving: -10, lifestyle: 5 } },
        { text: "Pay exactly for my salad and my taxes. Period.", impact: { discipline: 15, confidence: 15, saving: 10 } },
        { text: "I'll cover the whole bill! You guys get next time.", impact: { impulse: 15, chaos: 10, lifestyle: 10 } },
        { text: "I accidentally 'forget' my wallet.", impact: { chaos: 20, risk: 20, confidence: -20 } }
    ]},

    // RISK & DEBT
    { id: "RSK_01", cat: "risk", text: "Your friend tells you about a crypto coin that will '100x by tomorrow'.", options: [
        { text: "Ignore. I stick to index funds.", impact: { discipline: 15, future: 15, risk: -20 } },
        { text: "Throw in ₹1000 just in case. Fun money.", impact: { risk: 10, impulse: 5 } },
        { text: "Empty the savings account. We are going to the moon.", impact: { risk: 20, chaos: 20, future: -20 } },
        { text: "Report them to the SEC.", impact: { discipline: 10, confidence: 15 } }
    ]},
    { id: "DEB_01", cat: "debt", text: "You open your credit card statement.", options: [
        { text: "Pay in full immediately. Zero interest.", impact: { discipline: 20, saving: 10, chaos: -20 } },
        { text: "Pay the 'Minimum Due' and ignore the rest.", impact: { chaos: 20, risk: 15, future: -20 } },
        { text: "Wait till the absolute last day, then pay full.", impact: { discipline: 5, risk: 5 } },
        { text: "Delete the email. Out of sight, out of mind.", impact: { chaos: 25, future: -25, confidence: -20 } }
    ]},

    // PSYCHOLOGY & FUTURE
    { id: "PSY_01", cat: "psychology", text: "When you look at your bank balance, you feel:", options: [
        { text: "Total zen. Numbers are good.", impact: { confidence: 20, discipline: 10, chaos: -10 } },
        { text: "Anxiety trying to strangle my lungs.", impact: { confidence: -20, chaos: 15 } },
        { text: "Confusion. Where is it?", impact: { chaos: 20, discipline: -15 } },
        { text: "Nothing. It's empty anyway.", impact: { confidence: -15, saving: -20 } }
    ]},
    { id: "FUT_01", cat: "future", text: "Do you know what your financial life looks like in 5 years?", options: [
        { text: "Yes. Compounding interest graphs are my aesthetic.", impact: { future: 20, discipline: 15, saving: 15 } },
        { text: "I have a vague hope everything will be fine.", impact: { future: 5, confidence: 5 } },
        { text: "I don't even know what I'm eating for dinner tonight.", impact: { chaos: 20, future: -20, discipline: -15 } },
        { text: "I plan to win the lottery.", impact: { risk: 15, chaos: 15, future: -10 } }
    ]},
    { id: "FUT_02", cat: "future", text: "You get a 20% salary hike.", options: [
        { text: "Increase investments by 20%.", impact: { future: 20, discipline: 20, saving: 20 } },
        { text: "Upgrade my apartment.", impact: { lifestyle: 15, future: 5 } },
        { text: "Finally, I can afford my current spending habits.", impact: { chaos: 15, impulse: 10, saving: -10 } },
        { text: "Buy an excessively expensive car on EMI.", impact: { lifestyle: 20, risk: 15, future: -15 } }
    ]},
    { id: "IMP_05", cat: "impulse", text: "You're stressed after a horrible day at work.", options: [
        { text: "Go for a run. It's free.", impact: { discipline: 15, saving: 10, impulse: -10 } },
        { text: "Order exactly 1 comfort dessert.", impact: { lifestyle: 5, impulse: 5 } },
        { text: "Buy random useless gadgets off Amazon.", impact: { impulse: 20, chaos: 15 } },
        { text: "Book tickets to Bali.", impact: { impulse: 25, risk: 20, lifestyle: 20, chaos: 10 } }
    ]},
    { id: "SOC_02", cat: "social", text: "Your friend asks for a small loan.", options: [
        { text: "Absolutely not. I don't mix friends and money.", impact: { discipline: 15, risk: -10, confidence: 15 } },
        { text: "Lend it, but make them sign an informal contract.", impact: { discipline: 10, future: 5 } },
        { text: "Just give it. If they pay me back, cool.", impact: { saving: -5, risk: 10, lifestyle: 5 } },
        { text: "I'm the one asking for the loan.", impact: { chaos: 20, saving: -20 } }
    ]},
    { id: "SHOP_01", cat: "shopping", text: "You discover a brand selling a simple white t-shirt for ₹4000.", options: [
        { text: "It's an investment piece. Add to cart.", impact: { lifestyle: 20, impulse: 10, saving: -10 } },
        { text: "Laugh out loud and close the tab.", impact: { discipline: 15, confidence: 15, lifestyle: -10 } },
        { text: "Search for a cheaper knock-off.", impact: { saving: 10, discipline: 5 } },
        { text: "Buy it, wear it once, let it sit in the closet forever.", impact: { impulse: 15, chaos: 10 } }
    ]},
    { id: "TRV_01", cat: "travel", text: "Booking a flight for a vacation.", options: [
        { text: "Track prices for 6 weeks, book the absolute cheapest.", impact: { saving: 20, discipline: 15 } },
        { text: "Pay 3x extra to book one day before.", impact: { chaos: 20, impulse: 15, saving: -20 } },
        { text: "First Class or I don't fly.", impact: { lifestyle: 25, saving: -15 } },
        { text: "Use hoarded credit card points to travel free.", impact: { discipline: 15, future: 15, lifestyle: 10 } }
    ]},
    { id: "PSY_02", cat: "psychology", text: "The concept of 'retirement' makes you feel:", options: [
        { text: "Confident. My portfolio is diversified.", impact: { future: 20, confidence: 20, saving: 15 } },
        { text: "Bored. I will work forever.", impact: { future: 5, lifestyle: 5 } },
        { text: "Terrified. I'll probably live in the woods.", impact: { confidence: -15, chaos: 10 } },
        { text: "Retirement? I can barely survive Tuesday.", impact: { chaos: 20, future: -20 } }
    ]},
    { id: "EMG_01", cat: "emergency", text: "Your laptop immediately bursts into flames and dies.", options: [
        { text: "Buy the same exact model using my emergency fund.", impact: { saving: -5, discipline: 10, future: 5 } },
        { text: "Upgrade to the max spec 'Pro' version on impulse.", impact: { impulse: 20, lifestyle: 20, chaos: 10 } },
        { text: "Buy a cheap second-hand one.", impact: { saving: 15, discipline: 10 } },
        { text: "Take a personal loan with a 14% interest rate.", impact: { chaos: 20, risk: 20, future: -15 } }
    ]},
    { id: "DIS_01", cat: "discipline", text: "You're in the supermarket checkout line.", options: [
        { text: "Stare straight ahead. I only buy what's on the list.", impact: { discipline: 20, impulse: -20 } },
        { text: "Grab some gum.", impact: { impulse: 5 } },
        { text: "Grab three candy bars, a magazine, and a lighter.", impact: { impulse: 15, chaos: 5 } },
        { text: "Put something I actually needed back to afford the candy.", impact: { chaos: 20, impulse: 10, discipline: -15 } }
    ]},
    { id: "RSK_02", cat: "risk", text: "If I say the word 'Options Trading', you say:", options: [
        { text: "Gambling for nerds. No thanks.", impact: { risk: -20, discipline: 10 } },
        { text: "I've lost more money than I care to admit.", impact: { risk: 20, chaos: 20, saving: -15 } },
        { text: "It's a calculated strategy if done correctly.", impact: { discipline: 10, confidence: 15 } },
        { text: "What's an option?", impact: { risk: -5, confidence: -5 } }
    ]}
];