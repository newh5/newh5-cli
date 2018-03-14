import Promise from 'bluebird'

/**
 *
 * 
 */

async function copy(dist) {
    if (!dist) throw new Error('dist is empty')
    const ncp = Promise.promisify(require('ncp'))
    try {
        await Promise.all([
            ncp('dist/', `${dist}/`)
        ])
    } catch (e) {
        console.log(e)
    }
}

export default copy
