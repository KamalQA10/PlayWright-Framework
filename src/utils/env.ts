import fs from 'fs';
import path from 'path';

export function loadTestData(env: string) {
  const filePath = path.resolve(__dirname, `../data/${env.trim()}Data.json`);

  if (!fs.existsSync(filePath)) {
    console.log("Looking for file:", filePath);
    throw new Error(`❌ Test data file not found for env: ${env}`);
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}
