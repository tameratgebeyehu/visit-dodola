const fs = require('fs');

function checkImageFormat(filePath) {
  try {
    const buffer = Buffer.alloc(12);
    const fd = fs.openSync(filePath, 'r');
    fs.readSync(fd, buffer, 0, 12, 0);
    fs.closeSync(fd);

    const hex = buffer.toString('hex').toUpperCase();
    
    if (hex.startsWith('89504E470D0A1A0A')) {
      return 'PNG';
    } else if (hex.startsWith('FFD8FF')) {
      return 'JPEG';
    } else if (hex.startsWith('52494646') && hex.substring(16, 24) === '57454250') {
      return 'WEBP';
    } else {
      return `Unknown (${hex})`;
    }
  } catch (error) {
    return `Error reading file: ${error.message}`;
  }
}

const files = [
  './assets/images/dodola_forest.png',
  './assets/images/horse_market.png',
  './assets/images/traditional_dance.png',
  './assets/images/waterfall.png',
  './assets/images/hero.png',
  './assets/images/bale_mountains.png',
  './assets/images/logo.png', // Checking logo too just in case
];

for (const file of files) {
  console.log(`${file}: ${checkImageFormat(file)}`);
}
