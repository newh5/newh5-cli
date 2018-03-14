/**
* 此文件进入后直接执行第42行代码。即:
 * >node通过children,parent的形式【类似dom树的形式】加载模块依赖。
 * 在无子进程,且进程有两个以上的参数(第一个参数固定'tools/run',第二个参数为文件任务名,这些任务名都在当前目录中)的情况下
 * 清除require的缓存,
 * 加载该模块。
 * 执行该模块。
* */


/**
 *
 * @param {Date} time ,日期
 * @return {String} 包含时分秒的字符串
 * */
function format(time) {
    return time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1');
}

/**
 * 高阶函数 返回一个可执行函数。
 * @param {function} fn , 任务函数
 * @param {Object} options , 任务函数的参数
 * @return {function}  ,返回执行任务的函数。
 * */
function run(fn, options) {
    // fn 如果有默认任务,则使用其默认任务。
    const task = typeof fn.default === 'undefined' ? fn : fn.default;
    // 用于控制台输出任务执行时间。
    const start = new Date();
    console.log(
        `[${format(start)}] Starting '${task.name}${options ? `(${options})` : ''}'...`
    );

    return task(options).then((result) => {
        const end = new Date();
        const time = end.getTime() - start.getTime();
        console.log(
            `[${format(end)}] Finished '${task.name}${options ? `(${options})` : ''}' after ${time} ms`
        );
        return result;
    });
}

if (process.mainModule.children.length === 0 && process.argv.length > 2) {
    delete require.cache[__filename]; // eslint-disable-line no-underscore-dangle
    const module = require(`./${process.argv[2]}.js`).default;
    run(module).catch(err => console.error(err.stack));
}

export default run;
