import { spawnSync } from 'child_process'
import { exec } from './cp'

export const checkoutBranch = (branch, { cwd = './build' }) => {
  spawnSync('git', ['checkout', '-f', branch], { cwd, encoding: 'utf-8' })
}

export const checkoutNewBranch = (branch, { cwd = './build' }) => {
  spawnSync('git', ['checkout', '-b', branch], { cwd, encoding: 'utf8' })
}

export const cleanBranch = ({ cwd = './build' }) => {
  spawnSync('git', ['reset', '--hard', 'HEAD'], { cwd, encoding: 'utf8' })
}

export function crateAndGoBranch(branchName, cwd) {
  spawnSync('git', ['checkout', '-b', branchName], { cwd })
}

export async function createEmptyBranch(branchName, cwd) {
  await exec('git', ['checkout', '--orphan', branchName], { cwd, encoding: 'utf8' })
  await exec('git', ['rm', '--catch', '-r'], { cwd, encoding: 'utf8' })
}

export const gitCommand = (command, cwd = './') => {
  spawnSync('git', command.split(' '), { cwd, encoding: 'utf8' })
}

export const deleteBranch = (branch, { cwd = './build' }) => {
  spawnSync('git', ['branch', '-D', branch], { cwd, encoding: 'utf8' })
}

export const fetchBranch = (branch, { cwd = './build' }) => {
  spawnSync('git', ['fetch', 'sit', `${branch}:${branch}`], { cwd, encoding: 'utf8' })
}

export function getCurrentBranch(cwd) {
  return (spawnSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { cwd, encoding: 'utf8' })
    .stdout.toString()).trim()
}

export async function getCurrentRemoteURL(cwd) {
  let result = await exec('git', ['config', '--get', 'remote.origin.url'], { cwd, encoding: 'utf8' })
  return result.out
}

export async function gotoBranch(branchName, cwd) {
  await exec('git', ['checkout', branchName], { cwd, encoding: 'utf8' })
}

export const pullBranch = (branch, { cwd = './build' }) => {
  spawnSync('git', ['pull', 'sit', branch], { cwd, encoding: 'utf8' })
}