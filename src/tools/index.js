import { getCurrentRemoteURL, getCurrentBranch, createEmptyBranch as newEmptyBranch, gotoBranch } from './git-repo';
import { exec, spawn } from './cp';


export const getRemoteURL = getCurrentRemoteURL;
export const getBranchName = getCurrentBranch;
export const createEmptyBranch = newEmptyBranch;
export const goBranch = gotoBranch;

export const execPromise = exec;
export const spawnPromise = spawn;
