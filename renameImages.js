const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'assets', 'images');
const filesToRename = [
  'dodola_forest.png',
  'horse_market.png',
  'traditional_dance.png',
  'waterfall.png',
  'hero.png',
  'bale_mountains.png'
];

filesToRename.forEach(filename => {
  const oldPath = path.join(imagesDir, filename);
  const newPath = path.join(imagesDir, filename.replace('.png', '.jpg'));
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${filename} -> ${filename.replace('.png', '.jpg')}`);
  } else {
    console.log(`File not found: ${filename} (Maybe already renamed?)`);
  }
});
