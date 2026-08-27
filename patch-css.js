const fs = require('fs');
let css = fs.readFileSync('css/style.css', 'utf8');

// Fix 4 & 8: Move extreme padding from main to footer
css = css.replace(
    'body.android-native-app main { padding-bottom: calc(env(safe-area-inset-bottom) + 80px) !important; }',
    'body.android-native-app footer { padding-bottom: calc(env(safe-area-inset-bottom) + 90px) !important; padding-top: 1rem !important; margin-bottom: 0 !important; border-bottom: none !important; }\\nbody.android-native-app main { padding-bottom: 2rem !important; }'
);

// Fix 3, 5, 7: Add missing rules
if (!css.includes('modalFadeIn')) {
    css += '\\n/* ANDROID QA FIXES */\\n';
    css += 'body.android-native-app { overflow-x: hidden !important; width: 100vw !important; }\\n';
    css += 'body.android-native-app .ticker-wrap { max-width: 100vw !important; overflow: hidden !important; box-sizing: border-box !important; }\\n';
    css += 'body.android-native-app #view-settings { padding-top: max(env(safe-area-inset-top), 2rem) !important; }\\n';
    css += '@keyframes modalFadeIn { from { opacity: 0; } to { opacity: 1; } }\\n';
    css += 'body.android-native-app .modal:not(.hidden) { animation: modalFadeIn 0.2s ease-out; }\\n';
}

fs.writeFileSync('css/style.css', css);
console.log('CSS Patched');

