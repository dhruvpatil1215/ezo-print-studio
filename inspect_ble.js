const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
const idx = lines.findIndex(l => l.includes('connectBluetooth()'));
console.log(lines.slice(idx, idx + 35).join('\n'));

