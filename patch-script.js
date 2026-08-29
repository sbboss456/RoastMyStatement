const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace('<script src="js/app.js"></script>', '<script src="js/data-engine.js"></script>\n    <script src="js/app.js"></script>');
fs.writeFileSync('index.html', html);
