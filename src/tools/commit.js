import GitRepo from 'git-repository'
import fse from 'fs-extra'

import run from './run'
import build from './build'
import copy from './copy'
import uploadCDN from './uploadCDN'
import { pullBranch, fetchBranch, checkoutBranch, getCurrentBranch, cleanBranch, deleteBranch, checkoutNewBranch } from './git-repo'

const REPOPATH = './_build'

const getRemote = (slot) => {
  return {
    name: slot || '',
    url: `ssh://git@github.com:newh5-templates/newh5-build.git`
  }
}


export async function commit(page, isCDN = 'no') {

  fse.ensureDirSync(REPOPATH)

  const remote = getRemote(process.argv.includes('--production') ? null : 'sit')

  const repo = await GitRepo.open(REPOPATH, { init: true })

  await repo.setRemote(remote.name, remote.url)

  let branch = await getCurrentBranch({ cwd: './' })

  branch = branch.trim()

  // checkout -- .
  //await cleanBranch({cwd: REPOPATH})

  if ((await repo.hasRef(remote.url, branch))) {
    await repo.fetch(remote.name)
    await repo.reset(`${remote.name}/${branch}`, { hard: true })
    await repo.clean({ force: true })

  } else {
    await checkoutBranch('master', { cwd: REPOPATH })
    await deleteBranch(branch, { cwd: REPOPATH })
    await checkoutNewBranch(branch, { cwd: REPOPATH })

  }

  await cleanBranch({ cwd: REPOPATH })

  try {
    await checkoutBranch(branch, { cwd: REPOPATH })

  } catch (e) {
    await fetchBranch(branch, { cwd: REPOPATH })
    await checkoutBranch(branch, { cwd: REPOPATH })
  }

  await pullBranch(branch, { cwd: REPOPATH })

  try {
    process.argv.push('--release')

    await run(copy.bind(null, 'build'))

    //await repo.push(remote.name, branch)
    await Promise.all(page.map(async p => {

      await run(build.bind(null, p, isCDN))

      if (isCDN === "yes") {
        await run(uploadCDN.bind(null, p))
      }
    }))

    await repo.add('--all .')

    await repo.commit(JSON.stringify(page.toString()))
    // await repo.push(remote.name, branch, {force:true})
    await repo.push(remote.name, branch)

  } catch (e) {
    console.log('-- deploy error --')
    console.log(e)
  }
}
