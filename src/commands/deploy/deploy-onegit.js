/**
 * deploy all pages to only one Build repo together.
 */
const debug = require('debug')('newh5-cli:Deploy-onegit')
import globalConfig from '../../newh5.config'
import path from 'path'
import fs from 'fs'
import Repo from 'git-repository'
import inquirer from 'inquirer'
import chalk from 'chalk'
import BuildCommand from '../build/build.js'
import { getRemoteURL, getBranchName, createEmptyBranch, goBranch } from '../../tools'

import copy from '../../tools/copy'

'use strict';

export default class DeployGit {
    constructor() {
        this.config = {
            name: 'NewPorject',
            target: null,       //[sit,uat,prod,deploy] set target branch Name
            commitInfo: 'new commit message',
            localRepoBuildPath: path.join(process.cwd(), '../_build')
        }
    }

    /**
     * 
     * @param {Object} opts
     */
    async execute(opts) {

        console.log(chalk.yellow('准备将编译结果推送至远端...'))

        Object.assign(this.config, opts)
        
        const currentPath = process.cwd()
        const branchName = await getBranchName(currentPath)
        const repoPath = this.config.localRepoBuildPath     //deployLocalRepoPath
        const deployBranchName = this.config.target || branchName || 'deploy'
        const remoteName = globalConfig.DeployRepoName
        const remoteURL = globalConfig.DeployRepoUrl

        debug("repoPath,deployBranchName=%s", chalk.red(repoPath, deployBranchName))
        debug("currentPath, remoteURL, branchName=%s", chalk.red(currentPath, remoteURL, branchName))

        await this.checkRepoPath(repoPath)
        console.log(`current git remote url is ${remoteURL}`)
        if (!remoteURL) {
            console.error(chalk.red('本地没有找到可用的git'))
            return
        }

        // 初始化build目录的git环境
        console.log(chalk.red('初始化build目录的git环境'))

        let git = await Repo.open(repoPath, { init: true })

        await git.setRemote(remoteName, remoteURL)

        if (await git.hasRef(remoteURL, deployBranchName)) {

            await git.fetch(remoteName)

            await goBranch(deployBranchName, repoPath)

            await git.reset(`${remoteURL}/${deployBranchName}`, { hard: true })

            await git.clean({ force: true })

        } else {
            createEmptyBranch(deployBranchName, repoPath)
        }

        console.log(chalk.red('开始 编译.....'))

        // 自动编译
        const buildCommand = new BuildCommand()
        await buildCommand.execute({
            debug: '',
            archive: ''
        })

        // 迁移dist文件到build目录
        await copy(repoPath)

        // 开始提交到deploy branch
        try {
            await git.add('--all .')
            await git.commit(this.config.commitInfo || `${this.config.name} deploy`)
            await git.push(remoteName, deployBranchName)

            console.log(chalk.green('deploy completed v(^O^)v'))

        } catch (err) {
            console.error('push to remote branch error')
            console.error(err)
        }
    }

    /**
     * 针对老项目的文件夹创建
     * 
     * @returns Promise
     */
    checkRepoPath(path) {
        console.log(chalk.yellow(`开始检查发布目录, 检查的路径是${path}`))
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, stat) => {
                if (err) {
                    this.checkRepoPathErrorHandler(err, resolve, reject, path)
                } else {
                    this.checkRepoPathSuccessHandler(stat, resolve, path)
                }
            })
        })
    }
    /**
     * fs.stat时获取的err结果
     * @param {Object} err
     * @param {Function} resolve Promise.resolve
     * @param {Function} reject Promise.reject
     */
    checkRepoPathErrorHandler(err, resolve, reject, path) {
        if (err.code == 'ENOENT') {
            console.error('未找到目录')
            this.createDir(path)
            resolve()
            return
        }
        reject()
    }
    /**
     * @param {Object} stat fs.stat 获取的参数
     * @param {Function} resolve Promise.resolve
     */
    checkRepoPathSuccessHandler(stat, resolve, path) {
        if (!stat.isDirectory()) {
            this.createDir(path)
        }
        resolve()
    }
    /**
     * 创建build目录
     */
    createDir(path) {
        console.log(chalk.yellow('开始创建目录'))
        fs.mkdirSync(path)
    }

}