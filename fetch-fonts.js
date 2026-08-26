
const fs = require('fs');
const https = require('https');
const path = require('path');

let css = fs.readFileSync('css/fonts/fonts.css', 'utf-8');
const urls = css.match(/url\((https:\/\/[^)]+)\)/g) || [];

let downloadPromises = urls.map((urlStr, index) => {
    let url = urlStr.replace('url(', '').replace(')', '');
    let ext = path.extname(url);
    let name = 'font_' + index + ext;
    
    return new Promise((resolve) => {
        https.get(url, (res) => {
            const file = fs.createWriteStream('css/fonts/' + name);
            res.pipe(file);
            file.on('finish', () => {
                file.close();
                css = css.replace(url, name); // Change URL to local relative path
                resolve();
            });
        });
    });
});

Promise.all(downloadPromises).then(() => {
    fs.writeFileSync('css/fonts/fonts.css', css);
    console.log('Fonts downloaded and CSS updated');
});

