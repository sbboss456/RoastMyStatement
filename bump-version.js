const fs = require('fs');
let bg = fs.readFileSync('android/app/build.gradle', 'utf8');
bg = bg.replace(/versionCode 4/, 'versionCode 5');
bg = bg.replace(/versionName "3.0.0"/, 'versionName "3.1.0"');
fs.writeFileSync('android/app/build.gradle', bg);
