import Promise from 'bluebird'

/**
 *
 * 
 */

async function copy(dist) {
    dist = dist || 'build';
    const ncp = Promise.promisify(require('ncp'))
    try {
        await Promise.all([
            ncp('dist/', `${dist}/`)
        ]);
    } catch (e) {
        console.log(e);
    }
}

export default copy
