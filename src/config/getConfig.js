import { CdnPublicURL } from '../newh5.config.js'

/**
 * custom dynamic configs for each project
 * @param {*} param0 
 */
export default function getConfig({ name, isCDN = 'no' }) {

    // 如果需要用CDN,则将publicPath 指向线上CDN地址。否则指向 '/newh5/'
    const publicPath = (isCDN === 'yes') ? CdnPublicURL : '/newh5/';

    const dynamicConfig = {
        output: {
            path: 'dist',
            publicPath: publicPath,
            filename: `assets/js/${name}_[name]_[hash:4].js`
        },
        outputCss: `assets/css/${name}_[name]_[hash:4].css`,
        htmlWebpackPluginOptions: {
            filename: `html/${name}.html`
        }
    }

    return dynamicConfig
}