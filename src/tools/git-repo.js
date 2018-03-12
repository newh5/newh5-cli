import { spawnSync } from 'child_process';
import { exec } from './cp';

export async function getCurrentRemoteURL(cwd) {
  let result = await exec('git', ['config', '--get', 'remote.origin.url'], {cwd, encoding: 'utf8'});
  return result.out;
};

export function getCurrentBranchName(cwd) {
  return (spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], {cwd, encoding: 'utf8'})
            .stdout.toString()).trim();
};

export async function createEmptyBranch(branchName, cwd) {
  await exec('git', ['checkout', '--orphan', branchName], {cwd, encoding: 'utf8'});
  await exec('git', ['rm', '--catch', '-r'], {cwd, encoding: 'utf8'});
};
/**
 * 
 * @export
 * @param {String} branchName
 * @param {String} cwd
 */
export function crateAndGoBranch(branchName, cwd) {
  spawnSync('git', ['checkout', '-b', branchName], {cwd});
};

export async function gotoBranch(branchName, cwd) {
  await exec('git', ['checkout', branchName], {cwd, encoding: 'utf8'});
}