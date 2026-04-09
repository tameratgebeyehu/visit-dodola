const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\8c6541ab-94b8-4831-9c6a-5147f9771a56';
const destDir = path.join(__dirname, 'assets', 'images');

const files = fs.readdirSync(srcDir);

// Find the latest generated files based on prefix
const categories = ['dir_public', 'dir_education', 'dir_banking', 'dir_hospitality', 'dir_utilities'];

categories.forEach(prefix => {
  const matchingFiles = files.filter(f => f.startsWith(prefix) && f.endsWith('.png'));
  if (matchingFiles.length > 0) {
    // get newest one based on timestamp in name
    const latestFile = matchingFiles.sort().reverse()[0];
    const srcPath = path.join(srcDir, latestFile);
    const destPath = path.join(destDir, `${prefix}.png`);
    
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${prefix} -> ${destPath}`);
  } else {
    console.log(`Warning: No generated file found for ${prefix}`);
  }
});

console.log("All done!");
