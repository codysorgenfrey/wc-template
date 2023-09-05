/* eslint-disable import/no-extraneous-dependencies */
import { promises as fs } from 'fs';
import * as path from 'path';
import * as esbuild from 'esbuild';

// Recursively copy a directory
async function copyDir(src, dest, exList = []) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  entries.forEach(async (entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (!exList.includes(entry.name)) {
      if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  });
}

// Copy static files
copyDir('./src', './build', ['components', 'AppRoot.js']);

// Bundle and minify the JS
await esbuild.build({
  entryPoints: ['./src/AppRoot.js'],
  bundle: true,
  minify: true,
  target: ['chrome64', 'firefox58', 'safari11', 'edge42'], // 2018 per wikipedia
  outfile: './build/AppRoot.js',
});
