/**
 * custom dynamic configs for each project
 * @param {*} param0 
 */
export default function getConfig({ name }) {
    const dynamicConfig = {
        output: {
            path: 'dist',
            publicPath: './',
            filename: `assets/js/${name}_[name]_[hash:4].js`
        },
        outputCss: `assets/css/${name}_[name]_[hash:4].css`
    }

    return dynamicConfig
}