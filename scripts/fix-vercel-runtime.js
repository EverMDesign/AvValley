#!/usr/bin/env node

/**
 * Fix Vercel runtime after build
 * Changes nodejs18.x to nodejs20.x in .vc-config.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(
  __dirname,
  '../.vercel/output/functions/_render.func/.vc-config.json'
);

try {
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    if (config.runtime === 'nodejs18.x') {
      console.log('Updating runtime from nodejs18.x to nodejs20.x...');
      config.runtime = 'nodejs20.x';
      fs.writeFileSync(configPath, JSON.stringify(config, null, '\t'));
      console.log('✓ Runtime updated successfully');
    } else {
      console.log(`Current runtime: ${config.runtime}`);
    }
  } else {
    console.log('No .vc-config.json found yet (build may not have run)');
  }
} catch (error) {
  console.error('Error fixing Vercel runtime:', error.message);
  process.exit(1);
}
