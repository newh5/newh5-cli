/**
 * 执行命令
 */
import cp from 'child_process';

const exec = (command, args, options) => new Promise((resolve, reject) => {
  let out = '';
  let err = '';
  const p = cp.spawn(command, args, options);
  p.stdout.on('data', data => out += data);
  p.stderr.on('data', data => err += data);
  p.on('error', reject);
  p.on('close', (code) => {
    out = out.trim();
    err = err.trim();
    resolve({code, out, err})
  });
});

const spawn = (command, args, options) => new Promise((resolve, reject) => {
  cp.spawn(command, args, options)
    .on('error', reject)
    .on('close', resolve);
});

export { exec, spawn };