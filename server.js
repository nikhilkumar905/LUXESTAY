const { spawn } = require('child_process');

const port = process.env.PORT || 5000;

console.log(`Starting JSON Server on port ${port}...`);

const child = spawn(
  'npx',
  ['json-server', 'db.json', '--port', String(port)],
  { stdio: 'inherit', shell: true }
);

child.on('error', (err) => {
  console.error('Failed to start JSON Server:', err);
  process.exit(1);
});

child.on('close', (code) => {
  process.exit(code || 0);
});
