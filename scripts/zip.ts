import { zip } from 'cross-zip';
import { mkdirSync } from 'node:fs';
mkdirSync('bundle', { recursive: true });
zip('dist', 'bundle/fab-test.zip', (err) => {
  if (err) { console.error(err); process.exit(1); }
  console.log('Created bundle/fab-test.zip');
});
