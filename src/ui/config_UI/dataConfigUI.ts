import fs from 'fs';
import path from 'path';

export function loadTestData(env: string) {
  const fileName = `${env.trim()}Data.json`;
  const filePath = path.resolve(__dirname, `../data/${fileName}`);

  if (!fs.existsSync(filePath)) {
    console.log("Looking for file:", filePath);
    throw new Error(`❌ Test data file not found for env: ${env}`);
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}