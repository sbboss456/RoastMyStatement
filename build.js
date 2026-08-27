const fs = require('fs');

fs.mkdirSync('www', {recursive:true});
if(!fs.existsSync('www/css')) fs.mkdirSync('www/css');
if(!fs.existsSync('www/js')) fs.mkdirSync('www/js');
if(!fs.existsSync('www/assets')) fs.mkdirSync('www/assets');

fs.cpSync('css', 'www/css', {recursive:true});
fs.cpSync('js', 'www/js', {recursive:true});

// Read and securely mutate index.html EXCLUSIVELY for the Android payload
let html = fs.readFileSync('index.html', 'utf8');

const androidInjection = `
    <!-- Android Native Pre-loader Engine -->
    <script id="android-preloader-engine">
        // Root-level synchronous check guarantees zero frames of flash
        if (localStorage.getItem('roast_onboarding_done') !== 'true') {
            document.write('<style id="ob-blocker">#app-container, .navbar, footer, .android-bottom-nav { display: none !important; opacity: 0; }</style>');
        }
    </script>
</head>`;

html = html.replace('</head>', androidInjection);

fs.writeFileSync('www/index.html', html);
console.log('Build output generated in www/');