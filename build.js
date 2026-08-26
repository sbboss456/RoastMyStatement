const fs = require('fs');
fs.mkdirSync('www', {recursive:true});
if(!fs.existsSync('www/css')) fs.mkdirSync('www/css');
if(!fs.existsSync('www/js')) fs.mkdirSync('www/js');
if(!fs.existsSync('www/assets')) fs.mkdirSync('www/assets');
fs.cpSync('css', 'www/css', {recursive:true});
fs.cpSync('js', 'www/js', {recursive:true});
fs.copyFileSync('index.html', 'www/index.html');
console.log('Build output generated in www/');
