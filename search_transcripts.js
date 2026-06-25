const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\admin\\.gemini\\antigravity\\brain';

async function run() {
  if (!fs.existsSync(brainDir)) {
    console.log("Brain directory does not exist.");
    return;
  }
  
  const folders = fs.readdirSync(brainDir);
  for (const folder of folders) {
    const logDir = path.join(brainDir, folder, '.system_generated', 'logs');
    const transcriptPath = path.join(logDir, 'transcript_full.jsonl');
    
    if (fs.existsSync(transcriptPath)) {
      console.log(`Scanning transcript: ${folder}`);
      const content = fs.readFileSync(transcriptPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, index) => {
        if (line.toLowerCase().includes('password') || line.toLowerCase().includes('db_url') || line.toLowerCase().includes('postgresql://')) {
          // Log matching line but truncate if too long
          console.log(`  - Match on line ${index + 1}:`);
          const length = line.length;
          const matchIdx = line.toLowerCase().indexOf('password');
          const start = Math.max(0, matchIdx - 100);
          const end = Math.min(length, matchIdx + 200);
          console.log(`    ... ${line.substring(start, end)} ...`);
        }
      });
    }
  }
}

run();
